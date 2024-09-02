# Gestion Parking

An Parking ticketing management system

-   Possibility of obtaining a parking ticket with the place number
-   Possibility of leaving the parking lot and freeing the place
-   View all free and occupied places, with their numbers

## Api Endpoints

-   GET: `/parking/list` - Return a parking with a list of all places
-   GET: `/place/getTicket` - Return an object with the id of the ticket and the id of the place
-   PUT: `/parking/removeTicket` - Accept an object with the id of the ticket and the id of the place, return a message in success

## What's inside?

This turborepo uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

### Apps and Packages

-   `api`: a [Nest.js](https://nestjs.com/) app
-   `web`: a [Vite React](https://vitejs.dev/) app
-   `@repo/eslint-config`: `eslint` configurations
-   `@repo/typescript-config`: `tsconfig.json` configurations
-   `@repo/schemas`: a zod schema library shared by both `web` and `api` applications

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting

### Build

To build all apps and packages, run the following command:

```sh
pnpm build:prod
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

### Start

To start all apps and packages, run the following command:

```sh
pnpm start:prod
```
