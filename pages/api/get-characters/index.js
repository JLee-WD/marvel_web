import { PrismaClient } from '@prisma/client';
import fetchMarvelData from "@/utils/marvelClient";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  try {
    let data;
    try {
      data = await fetchMarvelData('characters', {
        // You can pass additional query parameters here
        offset: offset,
        limit: limit,
      });
    } catch (error) {
      console.error('Error fetching marvel data: ', error);
    }

    const characters = data?.data?.results;

    for (const character of characters) {
      const { id: characterId, name, description, thumbnail, comics } = character;
      const thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;
      let existingCharacter;
      try {
        existingCharacter = await prisma.character.findUnique({
          where: { id: characterId },
        });
      } catch (error) {
        console.error('Error searching character: ', error);
      }

      if (!existingCharacter) {
        try {
          await prisma.character.create({
            data: {
              id: characterId,
              name,
              description,
              thumbnail: thumbnailUrl,
            },
          });
          console.log(`Character with ID ${characterId} created.`);
        } catch (error) {
          console.error('Error creating character: ', error);
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
            console.error('Error searching comic: ', error);
          }

          if (!existingComic) {
            try {
              await prisma.comic.create({
                data: {
                  id: comicId,
                  title,
                },
              });
              console.log(`Comic with ID ${comicId} created.`);
            } catch (error) {
              console.error('Error creating comic: ', error);
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
          } else {
            console.log(`Comic with ID ${comicId} already exists.`);
          }
        }
      } else {
        console.log(`Character with ID ${characterId} already exists.`);
      }
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error data:", error);
    res.status(500).json({ message: 'Error fetching Marvel data' });
  }
}