import 'dotenv/config';
import axios from 'axios';
import logger from './logTools.js';

const { GOOGLE_MAPS_API_KEY } = process.env;

const api = {
  async getAddressDetails(address) {
    const googleMapsQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const searchResult = await axios.get(googleMapsQuery);
      const locationData = searchResult.data.results[0];
      /*
      We only want exact matches for addresses, not approximations,
      although Google Maps is not always exactly accurate
      */
      if (locationData && !('partial_match' in locationData)) {
        return {
          latitude: locationData.geometry.location.lat,
          longitude: locationData.geometry.location.lng,
          formattedAddress: locationData.formatted_address,
        };
      }
    } catch (error) {
      logger.error('Error searching for address:', error);
    }
    return false;
  },
};

export default api;
