import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";
import addCharacterToDb from "@/utils/addCharacterToDb";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 16;
  const MAX_LIMIT = 50; // Define your maximum limit
  const MIN_LIMIT = 1;   // Define your minimum limit
  const sanitizedLimit = Math.min(Math.max(limit, MIN_LIMIT), MAX_LIMIT);
  let dbData;

  try {
    dbData = await prisma.character.findMany({
      skip: offset,
      take: sanitizedLimit,
    })
  } catch (error) {
    console.error('Error fetching db character data: ', error);
    res.status(500).json({ message: 'Error fetching db character data' });
  }

  if (dbData.length < sanitizedLimit) {
    let marvelData;
    try {
      marvelData = await fetchMarvelData('characters', {
        offset: offset,
        limit: sanitizedLimit,
      });
    } catch (error) {
      console.error('Error fetching marvel data: ', error);
      res.status(500).json({ message: 'Error fetching Marvel data' });
    }

    const characters = marvelData?.data?.results;

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
        skip: offset,
        take: sanitizedLimit,
      })
    } catch (error) {
      console.error('Error fetching db character data: ', error);
      res.status(500).json({ message: 'Error fetching db character data' });
    }
  }
  console.log('dbData: ', dbData);
  res.status(200).json(dbData);
}