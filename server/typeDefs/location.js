const locationType = `
  type Location {
    id: ID!
    name: String!
    address: String!
    latitude: Float!
    longitude: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
    organization: Organization!
  }
`;

export default locationType;
