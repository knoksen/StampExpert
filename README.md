# StampExpert

[![CI](https://github.com/yourusername/StampExpert/actions/workflows/test.yml/badge.svg)](https://github.com/yourusername/StampExpert/actions/workflows/test.yml)
Identify and catalog stamps from around the world with our advanced recognition system. Discover rarity, origin, and historical significance of your stamp collection.

## Installation
Run `npm install` to install development dependencies.

## Development
Start the application server from the project root with:

```bash
npm start
```

## Testing
Run placeholder tests with:

```bash
npm test
```

The command executes `server.js`, which serves the content in the `public/` folder and exposes a stub `/api/analyze` endpoint. Once it starts you can open [http://localhost:3000](http://localhost:3000) (or the URL shown in the terminal) in your browser to use the app.

## Build
Create a production build in the `dist/` directory with:

```bash
npm run build
```


## Configuration

The server can be configured via environment variables:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT`   | Port that the HTTP server listens on | `3000` |

Set these variables before starting the application if you need to override the defaults.

## Production Deployment

For a simple deployment run the server directly with Node:

```bash
NODE_ENV=production PORT=8080 node server.js
```

You can also build a Docker image using the provided `Dockerfile`:

```bash
docker build -t stampexpert .
docker run -p 8080:8080 -e PORT=8080 stampexpert
```


This command runs `node build.js` to copy the `public` and `src` files into
`dist/` and adjust paths in `index.html`.


Run the automated test suite with:

```bash
npm test
```

The command launches Jest, which starts the server and checks that the `/api/analyze` endpoint returns the placeholder JSON response.


