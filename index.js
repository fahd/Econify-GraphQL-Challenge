import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './server/typeDefs/index.js';
import resolvers from './server/resolvers/index.js';

const logTextColor = '\x1b[1m\x1b[36m%s\x1b[0m';
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 9000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: // insert db context here
}));

app.listen(port);

// Disable es-lint for our logging line.
/* eslint-disable */ 
console.log(logTextColor,`✅ Running GraphQL API server at: http://localhost:${port}/graphql`);
