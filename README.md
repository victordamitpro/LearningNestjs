# Learning Nestjs
Learning Nestjs

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

## Config settings .env for connect MySQL
Once the database has been configured, start the Nest App via ```npm run start:dev``` it automatically synchronizes the entities so ready to use.

```
MYSQL_HOST=MYSQL_HOST
MYSQL_PORT=MYSQL_PORT
MYSQL_USER=MYSQL_USER
MYSQL_PASSWORD=MYSQL_PASSWORD
MYSQL_DATABASE=MYSQL_DB

```

## Running migrations with typeorm
```
   $ npm run typeorm migration:run 
```

## Running the app

```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
```
## Running with docker container
```bash
    # Start
    $ docker-compose up -d

    # Stop
    $ docker-compose down
```
## Url Client Site

```bash
http://127.0.0.1:3000/login
```

## Url Swagger for Api Documentation

```bash
http://127.0.0.1:5001/api/doc

```

## Google Auth
Config Google OAuth key in file .env
```
GOOGLE_CLIENT_ID=MY_GOOGLE_CLIENT_ID
GOOGLE_SECRET=MY_SECRET_KEY
```
## Google Develop Credential Setup
Authorized JavaScript origins
```
http://localhost:5001
```
Authorized redirect URIs
```
http://localhost:5001/api/auth/google/callback
http://localhost:3000/api/auth/google/callback
```




