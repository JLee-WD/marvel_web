import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addComicToDb(comic, characterId) {
  const { name: title, resourceURI } = comic;
  const parts = resourceURI.split('/');
  const comicId = Number(parts.pop());
  let addedComic;
  try {
    addedComic = await prisma.comic.create({
      data: {
        id: comicId,
        title,
      },
    });
    console.log(`Comic with ID ${comicId} created.`);
  } catch (error) {
    return console.error('Error creating comic: ', error);
  }

  try {
    await prisma.characterComic.create({
      data: {
        characterId,
        comicId,
      },
    })
    console.log(`Character Comic relation with character ID ${characterId} and comic ID ${comicId} created.`);
  } catch (error) {
    console.error('Error creating character comic relation: ', error);
  }
  return addedComic;
}

module.exports = addComicToDb;