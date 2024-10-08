require('dotenv').config();
const axios = require('axios');

const HttpError = require('../models/http-error');

const googleApiKey = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${googleApiKey}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  console.log(coordinates);
  return coordinates
}

module.exports = getCoordsForAddress;
// Dummy function if you don't have an API_KEY
// function getCoordsForAddress(address) {
//   return {
//     lat: 40.7484474,
//     lng: -73.9871516
//   };
// }
