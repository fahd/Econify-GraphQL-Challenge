import { logTools, api } from '../utils/index.js';

const { logger } = logTools;

const modifyLocation = async (locationDict, address) => {
  const locationData = await api.getAddressDetails(address);
  // If valid address is inputted, add latitude and longitude to location data waiting to be saved
  if (locationData) {
    const { formattedAddress, latitude, longitude } = locationData;
    Object.assign(locationDict, { address: formattedAddress, latitude, longitude });
  }
  // If no valid address inputted, no address is saved
};

const locationResolver = {
  Query: {
    location: async (parent, { id }, { Location }) => {
      const location = await Location.findOne({
        where: {
          id,
        },
      });
      if (!location) {
        logger.warn(`Location with id of ${id} was not found! Please try your query again.`);
      }
      return location;
    },
  },
  Mutation: {
    createLocation: async (
      parent,
      {
        locationName,
        organizationId,
        address,
      },
      { Location, Organization },
    ) => {
      try {
        const newLocation = { name: locationName, organizationId };
        if (address) await modifyLocation(newLocation, address);
        const location = await Location.create(
          newLocation,
          {
            include: [Organization],
          },
        );
        return location;
      } catch (error) {
        const { message } = error.errors[0];
        logger.error(`Error in creating new location: ${message}`);
        return error;
      }
    },
    updateLocation: async (parent, {
      id,
      locationName,
      address,
    }, { Location }) => {
      const location = await Location.findOne({ where: { id } });
      if (location) {
        try {
          const modifiedLocation = { id };
          if (locationName) modifiedLocation.name = locationName;
          if (address) await modifyLocation(modifiedLocation, address);
          await Location.update(modifiedLocation, {
            where: {
              id,
            },
          });
          return `Location with id ${id} updated.`;
        } catch (error) {
          const errorMessage = `Error in updating location with id ${id}: ${error}`;
          logger.error(errorMessage);
          return errorMessage;
        }
      } else {
        const warnMessage = `The location record with id ${id} does not exist!`;
        logger.warn(warnMessage);
        return warnMessage;
      }
    },
    deleteLocation: async (parent, { id }, { Location }) => {
      const location = await Location.findOne({ where: { id } });
      if (location) {
        try {
          await Location.destroy({
            where: {
              id,
            },
          });
          return `Deleted location with id ${id}`;
        } catch (error) {
          const errorMessage = `Error in deleting location with id ${id}: ${error}`;
          logger.error(errorMessage);
          return errorMessage;
        }
      } else {
        const warnMessage = `The location record with id ${id} does not exist!`;
        logger.warn(warnMessage);
        return warnMessage;
      }
    },
  },
  Location: {
    organization: async (parent, args, { Organization }) => {
      const { organizationId } = parent;
      const organization = await Organization.findOne({
        where: {
          id: organizationId,
        },
      });
      return organization;
    },
  },
};

export default locationResolver;
