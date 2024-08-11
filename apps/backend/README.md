## Installation

1. Create .env file in this folder. Get file contents from Notion page and paste it into your .env file. Ensure you are not uploading this to git. It should be ignored in .gitignore file.

2. Run `npm install`

3. Setup `prettier` and `eslint` to format your files on save.

4. Run `npm run dev` to start running backend locally. It should be running on port 8080.

5. Install Postman to test sending requests to your backend.


## Writing API Guide

1. When creating/updating API endpoints, use decorators from `tsoa` (see [here](https://tsoa-community.github.io/docs/) for more details).
2. After updating endpoints, use `npm run oa:generate-types`, which will produce an open-api schema (in `backend_repo/build/swagger.json`), 
and generate types (in `client_repo/backend/backendApi.ts`) for use in the `client_repo`.
3. You may also check our open-api schema by going to `localhost:8080/api-docs` after running the BE.

## Dealing with Database

1. When making changes to database, test it out on docker container first. 
Use the docker-compose.yml to spin one postgres instance up.
2. To start, make a new SQL migration file with `npm run migrate:create [name_of_migration]`
3. Add the proper SQL commands to the migration file.
4. Run it against the docker container DB with `npm run migrate:up`. 
Ensure that the `DATABASE_URL` in the `.env` file is pointing at the docker container, and not prod DB.
5. After a successful migration, regenerate the kysely types with `npm run kysely:generate-types`. 
This will produce the correct DB types, which we use in `src/db/setup.ts`

## Writing Tests

1. Write all tests in the `src/tests/` folder, and make sure each test is named
wit the following format: `[testName].test.ts`
2. Run tests with `npm run test`
3. If running a test that uses the database, use the `test-containers` package to spin up
a temporary PG instance for each test. See `signup.test.ts` for reference.
