const locationResolver = {
  Query: {
    location: async (parent, { id }, { Location }) => {
      const location = await Location.findOne({
        where: {
          id,
        },
      });
      if (!location) {
        console.log('This location was not found! Please try your query again.');
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
        console.log('Error creating location:', error);
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
          console.log('Error in updating location:', error);
          return false;
        }
      } else {
        console.log(`The location record with an id of "${id}" does not exist!`);
        return false;
      }
    },
    deleteLocation: async (parent, { id }, { Location }) => {
      try {
        await Location.destroy({
          where: {
            id,
          },
        });
        return true;
      } catch (error) {
        console.log('Error deleting location:', error);
      }
      return false;
    },
  },
  Location: {
    organization: async ({ organizationId }, args, { Organization }) => {
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
