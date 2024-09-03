import { PrismaClient } from '@prisma/client';
import addComicToDb from './addComicToDb';

const prisma = new PrismaClient();

async function addCharacterToDb(character) {
  const { id: characterId, name, description, thumbnail, comics } = character;
  const thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;
  let addedCharacter;
  try {
    addedCharacter = await prisma.character.create({
      data: {
        id: characterId,
        name,
        description,
        thumbnail: thumbnailUrl,
      },
    });
    console.log(`Character with ID ${characterId} created.`);
  } catch (error) {
    return console.error('Error creating character: ', error);
  }

  const characterComics = comics?.items;
  for (const comic of characterComics) {
    const { name: title, resourceURI } = comic;
    const parts = resourceURI.split('/');
    const comicId = Number(parts.pop());
    let existingComic;
    try {
      existingComic = await prisma.comic.findUnique({
        where: { id: comicId },
      });
    } catch (error) {
      return console.error('Error searching comic: ', error);
    }

    if (!existingComic) {
      await addComicToDb(comic, characterId);
    }
  }
  return addedCharacter;
}

module.exports = addCharacterToDb;