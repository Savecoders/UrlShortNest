<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Url-Short | Api 📎

Url-Short that contains both the frontend and backend code for our application. The frontend is built using ReactJS and the backend is built using NestJS.

## Repository Structure

In this repository is organized as follows:

- `/src`: This directory contains the NestJS backend application.
- `/docs`: This directory contains all the project documentation, including requirements, data flow diagrams, state diagrams, and BPMN2 diagrams.

## Description

This an api from Url-short with nestjs and Auth JWT.

## Installation

```bash
 pnpm install
```

## Up Docker

```bash
docker-compose --env-file .env up -d
```

> [!NOTE]
> Docker-compose read default envirioment file `.env` you have rename `.env.template` and change the value form variables

## Up seed in Development

```bash
  http://localhost:3000/api/seed
```

## Running the app

```bash
# development
 pnpm run start

# watch mode

 pnpm run start:dev

# production mode

 pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
