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
    updateEvent(id:ID! eventName:String description:String date:String time:String): Boolean!
    deleteEvent(id:ID!): Boolean!
    
    createLocation(locationName:String! organizationId: ID! address:String): Location!
    updateLocation(id:ID! locationName:String address:String): Boolean!
    deleteLocation(id:ID!): Boolean!
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
