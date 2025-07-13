# StampExpert
Identify and catalog stamps from around the world with our advanced recognition system. Discover rarity, origin, and historical significance of your stamp collection.

## Installation
Run `npm install` to install development dependencies.

## Development
Start the application server from the project root with:

```bash
npm start
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
docker run -p 8080:8080 -e PORT=8080 -e NODE_ENV=production stampexpert
```

### Health Check

The application includes a health check endpoint at `/health` for monitoring:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### Security Features

The application includes production-ready security features:
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- HTTPS Strict Transport Security (in production mode)
- Request size limits (10MB)
- Graceful shutdown handling
- Error handling middleware


This command runs `node build.js` to copy the `public` and `src` files into
`dist/` and adjust paths in `index.html`.


Run the automated test suite with:

```bash
npm test
```

The command launches Jest, which starts the server and checks that the `/api/analyze` endpoint returns the placeholder JSON response.


