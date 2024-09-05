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
  } catch (error) {
    console.error('Error creating character comic relation: ', error);
  }
}

module.exports = addCharacterComicRelation;