const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const baseUrl = process.env.MARVEL_URL;

function getHash(ts) {
  return crypto
    .createHash('md5')
    .update(ts + privateKey + publicKey)
    .digest('hex');
}

async function fetchMarvelData(endpoint, params = {}) {
  const ts = new Date().getTime().toString(); // Generate a timestamp
  const hash = getHash(ts); // Generate the hash

  // Add authentication parameters to the request
  const queryParams = {
    ts,
    apikey: publicKey,
    hash,
    ...params, // Additional parameters passed to the function
  };

  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Marvel API:', error.message);
    throw error;
  }
}

module.exports = fetchMarvelData;