const organizationResolver = {
  Query: {
    organization: async (parent, { organizationName }, models) => {
      const organization = await models.Organization.findOne({
        where: {
          name: organizationName,
        },
      });
      if (!organization) {
        console.log(`Organization "${organizationName}" not found! Please try your query again`);
      }
      return organization;
    },
  },
  Mutation: {
    createOrganization: async (parent, { name }, models) => {
      try {
        const Organization = await models.Organization.create({
          name,
        });
        return Organization;
      } catch (error) {
        const { message } = error.errors[0];
        console.log('Error:', message);
        return error;
      }
    },
  },
  Organization: {
    events: async (parent, { organizationName }, models) => {
    },
    locations: async (parent, { organizationName }, models) => {
    },
  }
};

export default organizationResolver;
