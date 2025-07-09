# StampExpert
Identify and catalog stamps from around the world with our advanced recognition system. Discover rarity, origin, and historical significance of your stamp collection.

## Installation
Run `npm install` to install development dependencies.

## Development
Start a local development server that serves the files in `public/` with:

```bash
npm run start
```

The command runs `live-server` against the `public/` folder. Once it starts you
can open [http://localhost:8080](http://localhost:8080) (or the URL shown in the
terminal) in your browser to use the app.

You can also run the Node.js API server which serves the same static files and exposes a stub `/api/analyze` endpoint:

```bash
npm run server
```

## Build
Create a production build in the `dist/` directory with:

```bash
npm run build
```
