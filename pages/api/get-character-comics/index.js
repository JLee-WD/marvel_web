import fetchMarvelData from "@/utils/marvelClient";

export default async function handler(req, res) {
  const name = req.query.name || '';
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;
  try {
    const data = await fetchMarvelData('characters', {
      // You can pass additional query parameters here
      // offset: offset,
      // limit: limit,
      // name: name
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error data:", error);
    res.status(500).json({ message: 'Error fetching Marvel data' });
  }
}

// get all characters
// get all comics for all characters
// 