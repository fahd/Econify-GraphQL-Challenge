const organizationResolver = {
  Mutation: {
    createOrganization: (root, { name }, context) => {
      console.log('context', context);
      return { name };
    },
  },
};

export default organizationResolver;
