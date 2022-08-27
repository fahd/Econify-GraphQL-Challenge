import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const port = process.env.PORT || 9000;
const app = express();

app.use('/graphql', graphqlHTTP({
  graphiql: true,
}));

app.listen(port);
console.log(`Running GraphQL API server at: http://localhost:${port}/graphql`);
