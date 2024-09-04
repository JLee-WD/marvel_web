'use client'
import { PrismaClient } from '@prisma/client';
import Node from '../../src/components/Node';
import './styles.css';
import ComicLink from '../../src/components/ComicLink';
import ReadingList from '../../src/components/ReadingList';

const prisma = new PrismaClient();

export async function getStaticPaths() {
  // Fetch all character IDs from the database
  const characters = await prisma.character.findMany({
    select: { id: true }, // Only select the id field
  });

  // Generate paths for each character
  const paths = characters.map((character) => ({
    params: { id: character.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch character data based on the ID from params
  const character = await prisma.character.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comics: {
        include: {
          Comic: {
            include: {
              characters: { 
                include: {
                  Character: true, 
                },
              },
            },
          },
        },
      },
    },
  });

  const serializedCharacter = {
    ...character,
    comics: character.comics.map(comic => ({
      ...comic,
      Comic: {
        ...comic.Comic,
        publishedDate: comic.Comic.publishedDate?.toISOString() || null, 
      },
    })),
  };

  return {
    props: {
      character: serializedCharacter,
    },
  };
}

const CharacterPage = ({ character }) => {
  const { id, name, description, thumbnail, comics } = character;
  const thumbnailImg = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? '/silhouette.png' : thumbnail;

  const relatedCharacters = comics.flatMap((comic) =>
    comic?.Comic?.characters.map(character => ({
      character: character.Character,
      comic: comic.Comic,
    })) || []
  );
  
  const uniqueCharacters = Array.from(new Map(
    relatedCharacters.map(({ character, comic }) => [character.id, { character, comic }])
  ).values()).filter(({ character }) => character.id !== id);

  return (
    <div className='character__wrapper'>
      <ReadingList />
      <div className='character__container'>
        <div className='character__imageContainer'>
          <img className='character__image' src={thumbnailImg} alt={name} />
        </div>
        <div className='character__descriptionContainer'>
          <h1 className='character__title'>{name}</h1>
          <p className='character__description'>{description}</p>
          <h2 className='character__subTitle'>Comics</h2>
          <ul className='character__comicsList'>
            {comics.map((comicLink) => (
              <ComicLink key={comicLink.id} comicLink={comicLink} />
            ))}
          </ul>
        </div>
      </div>
      <div className='character__related'>
        <h3>Appears with:</h3>      
        <div className='character__relatedContainer'>
          {uniqueCharacters.map((character) => (
            <Node key={character.id} item={character} />
          ))}
      </div>
      </div>        

    </div>
  );
};

export default CharacterPage;
