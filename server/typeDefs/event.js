const eventType = `
  type Event {
    id: ID!
    name: String!
    description: String!
    date: String!
    time: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organization: Organization!
  }
`;

export default eventType;
