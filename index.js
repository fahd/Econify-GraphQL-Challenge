import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './server/typeDefs/index.js';
import resolvers from './server/resolvers/index.js';
import models, { sequelize } from './server/models/index.js';
import { logTools, seed } from './server/utils/index.js';

const eraseDatabaseOnSync = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 9000;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: models,
  }),
);

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    seed.createOrganizations();
    seed.createEvents();
    seed.createLocations();
  }
  app.listen(port, () => {
    console.log(
      logTools.logTextColorCyan,
      `🟢 Running GraphQL API server at: http://localhost:${port}/graphql`,
    );
  });
});
