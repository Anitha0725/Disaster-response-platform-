const axios = require('axios');

exports.getLatLongFromLocation = async (locationName) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json`,
    {
      params: {
        access_token: process.env.GEOCODER_API_KEY,
        limit: 1
      }
    }
  );
  const coords = response.data.features?.[0]?.geometry?.coordinates;
  return { lat: coords[1], lon: coords[0] };
};
