import fetchMarvelData from "@/utils/marvelClient";
import addOrUpdateComic from "@/utils/addOrUpdateComic";

async function addOrUpdateCharacterComicsToDb(characterId) {
  let marvelData;
  const responseData = []

  try {
    marvelData = await fetchMarvelData(`characters/${characterId}/comics`);
  } catch (error) {
    console.error('Error fetching marvel data: ', error);
  }

  const comics = marvelData?.data?.results;

  for (const comic of comics) {
    const dateObject = comic?.dates ? comic?.dates?.find((date) => date.type === "onsaleDate") : null;
    const date = new Date(dateObject?.date);
    const thumbnail = `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`;
    const comicObj = { id: comic?.id, title: comic?.title, publishedDate: date, thumbnail, description: comic?.description };
    try {
      addOrUpdateComic({comic, characterId});
    } catch (error) {
      console.error("Error data:", error);
    }
    responseData.push(comicObj);
  }
  return responseData;
}

export default addOrUpdateCharacterComicsToDb;