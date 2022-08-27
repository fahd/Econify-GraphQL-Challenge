import { mergeResolvers } from '@graphql-tools/merge';
import customScalar from './customScalar.js';
import eventResolver from './event.js';
import locationResolver from './location.js';
import organizationResolver from './organization.js';

const resolvers = [
  customScalar,
  eventResolver,
  locationResolver,
  organizationResolver,
];

export default mergeResolvers(resolvers);
