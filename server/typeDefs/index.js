import { mergeTypeDefs } from '@graphql-tools/merge';
import customScalar from './customScalars.js';
import organizationType from './organization.js';
import locationType from './location.js';
import eventType from './event.js';

const rootTypes = `
  type Query {
    organization(organization_name: String!): Organization!
    event(event_name: String!): Event!
    location(location_name: String!): Location!
    eventOrganization(event_name: String!): Organization!
    locationOrganization(location_name: String!): Organization!
  }

  type Mutation {
    createOrganization(name: String!): Organization!
    createEvent(event_name:String!): Event!
    updateEvent(event_name:String!): Event!
    deleteEvent(event_name:String!): Boolean!
    createLocation(event_name:String! address:String): Location!
    updateLocation(event_name:String!): Location!
    deleteLocation(location_name:String!): Location!
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
