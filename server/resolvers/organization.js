const organizationResolver = {
  Query: {
    organization: async (parent, args, models) => {

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
};

export default organizationResolver;
