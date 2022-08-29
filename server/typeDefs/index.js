import { mergeTypeDefs } from '@graphql-tools/merge';
import customScalar from './customScalars.js';
import organizationType from './organization.js';
import locationType from './location.js';
import eventType from './event.js';

const rootTypes = `
  type Query {
    organizations: [Organization!]!
    organization(id: ID!): Organization!

    event(id: ID!): Event!
    events: [Event!]!

    location(id: ID!): Location!
    locations: [Location!]!
  }

  type Mutation {
    createOrganization(name: String!): Organization!

    createEvent(eventName:String! description:String! organizationId:ID! date:String! time:String!): Event!
    updateEvent(id:ID! eventName:String description:String date:String time:String): Event!
    deleteEvent(id:ID!): Int!
    
    createLocation(locationName:String! organizationId: ID! address:String): Location!
    updateLocation(id:ID! locationName:String address:String): Location!
    deleteLocation(id:ID!): Int!
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
