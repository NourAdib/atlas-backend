# Running The Server

## Prerequisites

1. MySQL Server with a database named Atlas
2. Define the env variables
3. Running the migrations to create the database

### Env Variables

The list of Envs:

1. Database Host
2. Database Name
3. Databse Username
4. Databse Password
5. Secret
6. Session Driver
7. Firebase Type
8. Firebase Project ID
9. Firebase Bucket ID
10. Firebase Private Key
11. Stripe Test Key
12. Stripe Webhook Secret

### Migrations Run

`npm run typeorm:run-migrations`

### Normal Mode

`npm run start`

### Developer Mode

`npm run start:dev`

## Used Repo Template

https://github.com/NarHakobyan/awesome-nest-boilerplate
