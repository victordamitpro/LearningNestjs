# authen-template
A Authentication Application Template Which are using react and nestjs 

## Client Installation

```bash
   $ cd client
   $ npm install
```

## Server Installation

```bash
   $ cd server
   $ npm install
```
## Set Enviroment for secret key JWT and other configurations

```bash
   $ cp .dev.example .env
```

## Config settings ormconfig.json for connect MySQL
Once the database has been configured, start the Nest App via ```npm run start:dev``` it automatically synchronizes the entities so ready to use. :heart_eyes_cat:

```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "my_user",
    "password": "my_password",
    "database": "my_database",
    "synchronize": true,
    "logging": false,
    "entities": [
       "dist/**/*.entity.js"
    ],
    "migrations": [
       "dist/migrations/**/*.js"
    ],
    "subscribers": [
       "dist/subscriber/**/*.js"
    ],
    "cli": {
       "migrationsDir": "src/migrations",
       "subscribersDir": "src/subscriber"
    }
 }
```

## Running migrations with typeorm

```bash
   $ ts-node node_modules/.bin/typeorm migration:run
```

or

```bash
   $ node_modules/.bin/typeorm migration:run

## Running the app

```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
```
## Url Client Site

http://127.0.0.1:3000/login

## Url Swagger for Api Documentation
```
http://127.0.0.1:5001/api/doc

## Docker

