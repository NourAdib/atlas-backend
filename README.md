# Server and Build Status

![example workflow](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)

<br />

# Running The Server

## Prerequisites

1. MySQL Server with a database named Atlas
2. Define the env variables
3. Running the migrations to create the database

### Env Variables

The list of Envs:

1. Database Host
2. Database Name
3. Database Username
4. Database Password
5. Secret
6. Session Driver
7. Firebase Type
8. Firebase Project ID
9. Firebase Bucket ID
10. Firebase Private Key
11. Stripe Test Key
12. Stripe Webhook Secret
13. Port
14. reCaptcha Site Key
15. reCaptcha Secret Key

### Migrations Run

`npm run typeorm:run-migrations`

### Normal Mode

`npm run start`

### Developer Mode

`npm run start:dev`

### Load Tests Run

The artillery package must be installed first as it is a global package

`npm install -g artillery`

`artillery run test/load_testing/test.json`

### Unit and Integration Test Run

`npm run test`

## Used Repos

1. https://github.com/NarHakobyan/awesome-nest-boilerplate, used for file structure
2. https://github.com/jmcdo29/testing-nestjs, used for testing structure
