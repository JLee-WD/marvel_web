import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCharacterComicRelation(comicId, characterId) {
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
}

module.exports = addCharacterComicRelation;