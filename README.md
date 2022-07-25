# supercharged-data-fetching

This is the repo that I use for my "Supercharged Data Fetching" talk. Feel free to clone it, fork it, whatever to play around with it.

> If you use Gitpod, just simply check out the repo in Gitpod, which will handle downloading [hyper nano](https://blog.hyper.io/introducing-hyper-nano-hyper-cloud-in-a-bottle), bootstrapping it with a [hyper data service](https://hyper.io/product#data) and [hyper cache service](https://hyper.io/product#cache), seeding it with some data, creating a `.env` file, and then starting the GraphQL server

## Getting Started

First run `npm i`

You'll need a `.env` file containing a `HYPER` value that contains your connection string. For hyper nano, you can use `http://localhost:6363/pokemon`:

```
HYPER=http://localhost:6363/pokemon
```

Then run `node hyper-dev.js` to download hyper nano and bootstrap it with a [hyper data service](https://hyper.io/product#data) and [hyper cache service](https://hyper.io/product#cache) in the `pokemon` domain.

Then you can run `npm start` to start the GraphQL server, which will be listening on port `3000` by default.

## License

MIT
