##Instructions To Use:

This project creates a Node.js server integrated with GraphQL.
See specifications outlined in `Specifications.md`.

Server is hosted at `http://localhost:9000`.

___
### Installation Steps

##### Create a `.env` file with your environment variables
```
.env

DB_NAME=database_name
DB_USER=database_user
DB_PASSWORD=database_password
NODE_ENV=value (for example, DEVELOPMENT)
GOOGLE_MAPS_API_KEY=google_maps_api_key
````

##### Install Dependencies
```
npm install
````

##### Start Server
```
// Runs server
npm start

// (Optional) Runs server with nodemon watching file changes
npm run dev
````
- When `NODE_ENV=DEVELOPMENT` data will be seeded.
  - To see the specific data being seeded, visit `server/utils/seed.js`

##### Other Scripts
```
// uses Prettier to check code formatting
npm run format:check 

// uses Prettier to write code formatting
npm run format:write 

// uses eslint to check code adheres to JavaScript 
// best practices according to Airbnb style guide.
npm run lint:

// uses eslint to fix code to adhere to JavaScript 
// best practices according to Airbnb style guide.
npm run lint:fix 

```
- Located in `package.json`.

##### GraphQL IDE
Visit `http://localhost:9000/graphql/gql` to query and mutate the data, interactively.

