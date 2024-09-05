import { PrismaClient } from '@prisma/client';
import addCharacterComicRelation from './addCharacterComicRelation';

const prisma = new PrismaClient();

async function addOrUpdateComic({ comic, characterId }) {
  const comicId = comic?.id || Number(comic?.resourceURI?.split('/').pop());
  const title = comic?.title || comic?.name;
  const description = comic?.description || '';
  const thumbnail = comic?.thumbnail ? `${comic?.thumbnail.path}.${comic?.thumbnail.extension}` : '';
  const dateObject = comic?.dates ? comic?.dates?.find((date) => date.type === "onsaleDate") : null;
  const date = dateObject ? new Date(dateObject?.date).toISOString() : null;

  let existingComic;
  try {
    existingComic = await prisma.comic.findUnique({
      where: { id: comicId },
    });
  } catch (error) {
    console.error('Error searching comic: ', error);
  }

  let addedOrUpdatedComic;
  if (!existingComic) {
    try {
      addedOrUpdatedComic = await prisma.comic.create({
        data: {
          id: comicId,
          title,
          publishedDate: date,
          thumbnail,
          description
        },
      });
    } catch (error) {
      return console.error('Error creating comic: ', error);
    }
  } else {
    try {
      addedOrUpdatedComic = await prisma.comic.update({ 
        where: { id: comicId }, 
        data: { title, publishedDate: date, thumbnail, description } });
    } catch (error) {
      console.error("Error updateing comic:", error);
    }
  }

  try {
    await addCharacterComicRelation(comicId, characterId);
  } catch (error) {
    console.error('Error adding character-comic relation: ', error);
  }
  
  return addedOrUpdatedComic;
}

export default addOrUpdateComic;