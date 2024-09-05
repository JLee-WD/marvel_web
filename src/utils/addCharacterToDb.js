import { PrismaClient } from '@prisma/client';
import addOrUpdateCharacterComicsToDb from './addOrUpdateCharacterComicsToDb';

const prisma = new PrismaClient();

async function addCharacterToDb(character) {
  const { id: characterId, name, description, thumbnail } = character;
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
  } catch (error) {
    return console.error('Error creating character: ', error);
  }

  try {
    await addOrUpdateCharacterComicsToDb(characterId);
  } catch (error) {
    console.error('Error adding or updating character comics: ', error);
  }

  return addedCharacter;
}

module.exports = addCharacterToDb;