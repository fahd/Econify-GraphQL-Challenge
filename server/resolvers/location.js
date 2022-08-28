import { logTools } from '../utils/index.js';

const { logger } = logTools;

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
        const location = await Location.create(
          newLocation,
          {
            include: [Organization],
          },
        );
        return location;
      } catch (error) {
        logger.error(`Error in creating new location: ${error}`);
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
          const modifiedLocation = {};
          modifiedLocation.id = id;
          if (locationName) modifiedLocation.name = locationName;
          if (address) {
            modifiedLocation.address = address;
            modifiedLocation.latitude = address;
            modifiedLocation.longitude = address;
          }
          await Location.update(modifiedLocation, {
            where: {
              id,
            },
          });
          return true;
        } catch (error) {
          logger.error(`Error in updating location with id ${id}: ${error}`);
          return false;
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
