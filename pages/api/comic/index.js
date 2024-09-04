import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";
import updateComic from '@/utils/addOrUpdateComic';

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
  let thumbnailUrl;
  let description;
  if (!publishedDate) {
    try {
      const data = await fetchMarvelData(`comics/${comicId}`);
      const results = data?.data?.results;
      console.log('results: ', results);
      const { description: resDescription, thumbnail } = results[0];
      description = resDescription || "No description available.";
      thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;
      console.log('description: ', description);
      console.log('thumbnail: ', thumbnail);

      const dateObject = results[0]?.dates?.find((date) => date.type === "onsaleDate");
      date = new Date(dateObject?.date).toISOString();
    } catch (error) {
      console.error("Error fetching marvel data:", error);
      res.status(500).json({ message: 'Error fetching Marvel data' });
    }

    try {
      updateComic({
        id, title, publishedDate: date, thumbnail: thumbnailUrl, description
      })
    } catch (error) {
      console.error("Error data:", error);
    }

    const responseData = { id, title, publishedDate: date, thumbnail: thumbnailUrl, description };
    res.status(200).json(responseData);
  } else {
    res.status(200).json(existingComic);
  }
}