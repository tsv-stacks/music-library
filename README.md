# Music Library API

This is a Node.js Express API for managing artists and albums data. It provides HTTP endpoints for creating, reading, updating, and deleting artists and albums. The API uses the HTTP methods:

- POST for creating new artists and albums
- GET for retrieving artists and albums data
- PUT for updating an entire artist or album
- PATCH for partially updating an artist or album
- DELETE for deleting an artist or album

## Installation

To use this API in your project, you need to set up a PostgreSQL database to store the artists and albums data. You can use a Docker container to run the PostgreSQL server and initialise the database.

1. First clone the repo and install all dependencies:

```bash
git clone https://github.com/tsv-stacks/music-library

cd <your-repo>

npm install
```

2. Install [Docker](https://docs.docker.com/get-docker/) on your system if it's not already installed

3. Create a `.env` file in the root directory of this repository with the following parameters:

```text
   PGUSER=postgres
   PGHOST=localhost
   PGPASSWORD=password
   PGDATABASE=music_library_dev
   PGPORT=5432
   PORT=3000
```

4. Run the docker container with:

```bash
docker run --name music-lib -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

5. Start the API server by running:

```bash
npm run start
```

## Guide

| Method | Endpoint            | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| POST   | /artists            | Creates a new artist                      |
| GET    | /artists            | Retrieves all artists                     |
| GET    | /artists/:id        | Retrieves a specific artist               |
| PUT    | /artists/:id        | Replaces a specific artist                |
| PATCH  | /artists/:id        | Updates a specific artist                 |
| DELETE | /artists/:id        | Deletes a specific artist                 |
| POST   | /artists/:id/albums | Creates a new album for a specific artist |
| GET    | /albums             | Retrieves all albums                      |
| GET    | /albums/:id         | Retrieves a specific album                |
| PUT    | /albums/:id         | Replaces a specific album                 |
| PATCH  | /albums/:id         | Updates a specific album                  |
| DELETE | /albums/:id         | Deletes a specific album                  |

## Dependencies

This project has the following dependencies:

- dotenv: "^16.0.3"
- express: "^4.18.2"
- pg: "^8.9.0"
- postgres-migrations: "^5.3.0"

And the following devDependencies:

- chai: "^4.3.7"
- eslint: "^8.34.0"
- mocha: "^10.2.0"
- nodemon: "^2.0.20"
- supertest: "^6.3.3"

##Contact me

If you encounter any issues or bugs, or have any suggestions for improving this project, please feel free to contact me on [twitter](https://twitter.com/tsv_stacks).

You can also submit an issue on this repository to report any bugs or suggest new features. Please provide as much detail as possible, including any error messages and steps to reproduce the issue.
