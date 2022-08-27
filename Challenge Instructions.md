Econify-Challenge

1. Please implement a Node.JS server with a GraphQL based API that has the abilities to Create, Read, Update, & Delete Locations & Events.

2. We would also like to be able to query and find all the locations & events belonging to an organization, as well as the reverse: being able to query a location(s) / event(s) and having the ability to find the organization it belongs to.

Some bullet points:

3.  - No front end is required here
    - Please do not use Prisma
    - Please use a persistent database

---

Database Schema:

1. Organization:
    - Name
    - CreatedAt
    - UpdatedAt

2. Locations: (belongs to Organization):
    - Name
    - Address
    - Latitude
    - Longitude
    - CreatedAt
    - UpdatedAt

3. Events (belongs to Organization)
    - Name
    - Date / Time (can modify these columns to fit your needs better. Doesn’t have to be exactly one column)
    - Description
    - CreatedAt
    - UpdatedAt

\*\*\*Bonus:

-   When a user submits a location with an address, the latitude & longitude is gathered via the Google Places API.

Keep in mind we will be reviewing the architecture and modularization of your code, so having it work well is only part of the project.

Feel free to use any packages you would like to get the project working.

You should imagine you’re submitting this work to a client.
