const organizationType = `
  type Organization {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    events: [Event!]!
    locations: [Location!]!
  }
`;

export default organizationType;
