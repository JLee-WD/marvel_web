import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";
import addCharacterToDb from "@/utils/addCharacterToDb";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const characterName = req.query.name;
  let dbData;
  try {
    dbData = await prisma.character.findMany({
      where: { 
        name: {
          contains: characterName,
        }
      }
    })
  } catch (error) {
    console.error('Error fetching db characters by name: ', error);
    res.status(500).json({ message: 'Error fetching db characters by name' });
  }

  console.log('dbData: ', dbData);

  if (dbData.length < 1) {
    let marvelData;
    try {
      marvelData = await fetchMarvelData('characters', {
        nameStartsWith: characterName,
      });
    } catch (error) {
      console.error('Error fetching marvel data: ', error);
      res.status(500).json({ message: 'Error fetching Marvel data' });
    }

    const characters = marvelData?.data?.results;
    console.log('characters: ', characters);

    for (const character of characters) {
      const { id: characterId} = character;
      let existingCharacter;
      try {
        existingCharacter = await prisma.character.findUnique({
          where: { id: characterId },
        });
      } catch (error) {
        console.error('Error searching character: ', error);
        res.status(500).json({ message: 'Error searching character' });
      }
      if (!existingCharacter) {
        await addCharacterToDb(character);
      }
    }
    try {
      dbData = await prisma.character.findMany({
        where: { 
          name: {
            contains: characterName
          }
        },
      })
    } catch (error) {
      console.error('Error fetching db characters by name: ', error);
      res.status(500).json({ message: 'Error fetching db characters by name' });
    }
  }
  return res.status(200).json(dbData);
}