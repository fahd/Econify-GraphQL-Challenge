const organizationResolver = {
  Query: {
    organization: async (parent, { id }, { Organization }) => {
      const organization = await Organization.findOne({
        where: {
          id,
        },
      });
      if (!organization) {
        console.log('This organization was not found! Please try your query again.');
      }
      return organization;
    },
    organizations: async (parent, args, { Organization }) => {
      const organizations = await Organization.findAll();
      if (!organizations) {
        console.log('There are no organizations added yet.');
      }
      return organizations;
    },
  },
  Mutation: {
    createOrganization: async (parent, { name }, { Organization }) => {
      try {
        const organization = await Organization.create({
          name,
        });
        return organization;
      } catch (error) {
        const { message } = error.errors[0];
        console.log('Error Creating Organization:', message);
        return error;
      }
    },
  },
  Organization: {
    events: async (parent, args, { Event }) => {
      const parentOrganizationId = parent.id;
      const events = await Event.findAll({
        where: {
          organizationId: parentOrganizationId,
        },
      });
      return events;
    },
    locations: async (parent, args, { Location }) => {
      const parentOrganizationId = parent.id;
      const locations = await Location.findAll({
        where: {
          organizationId: parentOrganizationId,
        },
      });
      return locations;
    },
  },
};

export default organizationResolver;
