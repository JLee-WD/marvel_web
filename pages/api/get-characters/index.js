import fetchMarvelData from "@/utils/marvelClient";

export default async function handler(req, res) {
  try {
    const data = await fetchMarvelData('characters', {
      // You can pass additional query parameters here
      // limit: 10, // Example: limit the number of comics returned
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error data:", error);
    res.status(500).json({ message: 'Error fetching Marvel data' });
  }
}