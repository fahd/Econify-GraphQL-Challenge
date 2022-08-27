import { mergeTypeDefs } from '@graphql-tools/merge';
import customScalar from './customScalars.js';
import organizationType from './organization.js';
import locationType from './location.js';
import eventType from './event.js';

const rootTypes = `
  type Query {
    name: String!
    address: String!
    getHomies: String!
  }

  type Name {
    name: String!
  }

  type Mutation {
    createOrganization(name: String!): Name!
  }

  schema {
    query:Query
    mutation: Mutation
  }
`;

const types = [
  customScalar,
  organizationType,
  locationType,
  eventType,
  rootTypes,
];

export default mergeTypeDefs(types);
