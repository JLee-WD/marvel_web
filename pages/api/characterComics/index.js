import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";
import addCharacterToDb from "@/utils/addCharacterToDb";
import addOrUpdateComic from '@/utils/addOrUpdateComic';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const characterId = req.query.id;
  
  let marvelData;
  const responseData = []
  try {
    marvelData = await fetchMarvelData(`characters/${characterId}/comics`);
  } catch (error) {
    console.error('Error fetching marvel data: ', error);
    res.status(500).json({ message: 'Error fetching Marvel data' });
  }
  const results = marvelData?.data?.results;
  for (const comic of results) {
    const { id, title, description } = comic;
    const thumbnailUrl = `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`;
    const dateObject = comic?.dates?.find((date) => date.type === "onsaleDate");
    const date = new Date(dateObject?.date).toISOString();
    const comicObj = { comicId: id, title, publishedDate: date, thumbnail: thumbnailUrl, description };
    try {
      addOrUpdateComic({comic, characterId});
    } catch (error) {
      console.error("Error data:", error);
    }
    responseData.push(comicObj);
  }

  return res.status(200).json(responseData);
}