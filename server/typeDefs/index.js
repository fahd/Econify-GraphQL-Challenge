import { mergeTypeDefs } from '@graphql-tools/merge';
import customScalar from './customScalars.js';
import organizationType from './organization.js';
import locationType from './location.js';
import eventType from './event.js';

const rootTypes = `
  type Query {
    organization(organizationName: String!): Organization!
    event(eventName: String!): Event!
    location(locationName: String!): Location!
    eventOrganization(eventName: String!): Organization!
    locationOrganization(locationName: String!): Organization!
  }

  type Mutation {
    createOrganization(name: String!): Organization!
    createEvent(eventName:String!): Event!
    updateEvent(eventName:String!): Event!
    deleteEvent(eventName:String!): Boolean!
    createLocation(locationName:String! address:String): Location!
    updateLocation(locationName:String!): Location!
    deleteLocation(locationName:String!): Location!
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
