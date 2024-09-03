import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const comicId = parseInt(req.query.id);
  let existingComic;

  try {
    existingComic = await prisma.comic.findUnique({
      where: { id: comicId },
    });
  } catch (error) {
    console.error('Error searching comic: ', error);
  }

  const { id, title, publishedDate } = existingComic;

  let date;
  if (!publishedDate) {
    try {
      const data = await fetchMarvelData(`comics/${comicId}`);
      console.log('data: ', data);
      const results = data?.data?.results;
      const dates = results[0]?.dates;
      const dateObject = dates?.find((date) => date.type === "onsaleDate");
      date = new Date(dateObject?.date).toISOString();
    } catch (error) {
      console.error("Error fetching marvel data:", error);
      res.status(500).json({ message: 'Error fetching Marvel data' });
    }

    try {
      await prisma.comic.update({ 
        where: { id: comicId }, 
        data: { publishedDate: date } });
    } catch (error) {
      console.error("Error data:", error);
      res.status(500).json({ message: 'Error fetching Marvel data' });
    }

    const responseData = { id, title, publishedDate: date };
    res.status(200).json(responseData);
  } else {
    res.status(200).json(existingComic);
  }
}