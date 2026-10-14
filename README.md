# Knockout TypeScript Task App

A small task-list frontend built with Knockout, TypeScript, and webpack.

## Requirements

- Node.js (an active LTS release is recommended)
- npm, included with Node.js
- A task API at `http://localhost:8080/api` for loading and creating tasks

The frontend sends `GET /tasks` to load tasks and `POST /tasks` to create one. The API should allow browser requests from the frontend origin, including the required CORS settings.

## Install

From the project root, install the dependencies recorded in `package-lock.json`:

```sh
npm ci
```

Alternatively, use `npm install` to install or update dependencies.

## Run in development

Start webpack's development server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000). The development server enables hot reloading.

## Build for production

Create an optimized production build:

```sh
npm run build
```

Webpack writes the generated site to the `dist/` directory. Deploy that directory to a static web host to serve the production build. The API URL is currently set in `src/api/api.service.ts`.

## Available commands

| Command | Description |
| --- | --- |
| `npm ci` | Install exact dependency versions from the lockfile |
| `npm start` | Run the development server on port 3000 |
| `npm run build` | Build production files in `dist/` |

If task data does not load, confirm that the API is running at `http://localhost:8080/api` and that it permits cross-origin requests from `http://localhost:3000`.