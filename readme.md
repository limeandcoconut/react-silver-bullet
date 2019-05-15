# [![100 on all Google Lighthouse tests](/src/shared/assets/meta/og-image.png)](https://recat.jacobsmith.tech)

## Overview
This is a React progressive web app boilerplate - [there are literally hundreds of others out there.](https://www.javascriptstuff.com/react-starter-projects/). I created this based off work by [Manuel Bieh](https://github.com/manuelbieh/react-ssr-setup) to have one central repo I can base my React projects on. It parallels my [Vue boilerplate](https://github.com/limeandcoconut/pwa-boilerplate) (at least in theory)<!-- TODO: fix this -->. 

This project is designed to be, extendable, comprehensible, and powerful. It supports server side rendering, hot module reloading, font preloading, and a slew of other awesome 🕶 features. It's [highly configurable](#configuration) too!

Another reason I've created my own boilerplate is that I wan't to be working with bleeding edge tech in an environment I control using conventions that fit my tastes. As features are added there will probably be plenty of beta versions to check out so keep an eye out. 

A few things might be familiar when you've worked with other starter projects before. I borrowed many ideas from the aforementioned [react-ssr-setup]. You'll find the overall structure very reminiscent of it with major differences in implementation details and design choices. Starting with its switch to TypeScript I expect the projects to diverge rapidly.

Static files are served with Nginx.

HAProxy is the tls terminator and reverse proxy.

## Features
-   Chops
    -   💯 100 on all Google Lighthouse tests
        <details>
        <summary>Awwwww yeeeeah!
        </summary>  
        <br>  

        ![100 on all Google Lighthouse tests]
        </details>  
    -   🔥 Lots of sweet sweet Webpack 4 sauce
    -   📱 PWA
    -   🦄 SSR + CSR
    -   😎 Brotli compression
    -   👌 Font preload and preconnecting with local fallbacks
    -   🐦 Sweeet OG and Twitter meta

-   Setup
    -   🔥 Babel 7
    <br>

    -   ⚛ React 16
    -   ✅ Hot Module Reloading (HMR)
    -   ✅ Less modules
    -   ✅ PostCSS
    -   ✅ Redux + Redux Saga
    -   ✅ Immer
    -   ✅ React Router 4
    -   ✅ React Helmet
    -   ✅ Checkout `doiuse` in [postcss.config.js](/postcss.config.js) 👀

## Getting started
1. Clone the project and npm install. 
1. Then run `config/init.sh`
1. Change the created `config/keys.js` to have your own values.
1. `$ docker-compose up -d` to start haproxy and nginx.
1. `$ npm run start` for development, `$ npm run build && npm run start:live` for production.
    > In production I'm using [pm2] 

## Configuration
There are several critical configuration files: 

config  <br>
├ ... <br>
├ config.js <br>
├ env.js <br>
├ meta.js <br>
├ paths.js <br>
└ keys.js <br>

`config.js`: Google Analytics tracking id's and similar non-sensitive configuration values. **This file is exposed to the client**  
`env.js`: `process.env` variables and the like. [There's a section on them.](#env-variables)  
`meta.js`: Site meta information. From here values are injected into the head and pwa manifest, and icons are generated. **This file is exposed to the client.** 
`paths.js`: Paths useful for the project. This file is not exposed to the client in part to keep `fs` from being required there.  
`keys.js`: Database passwords and other critical info. **This file is NOT exposed to the client** 🤨 

### env variables

There are a few `process.env' variables in use (in order of importance).

`NODE_ENV`: Set `NODE_ENV=development` for development or `NODE_ENV=production` for production.

`LIVE_GA`: Uses live analytics id if and only if `true`

`LITE_BUILD`: Prevents webpack compression, file copy, and image conversion plugins for a quick production build test when `true`.

`PORT`: Specifies a port other than the default of `:8500`

`OMIT_SOURCEMAP`: Omits sourcemaps when `true`

`MUTE_PACK`: Turns off warnings and console highlighting sugar if `true`

`HOST`: Almost unnecessary. Specifies a different host for logging and static html.

## Scripts

`start`: Start the app in development mode with HMR for client and webpack watching the server.

`start:live`: Start the production server. (I suggest [pm2] for actual production)

`build`: Do a production build of the site. 

`build:live`: Do a production build of the site **with live analytics**.

`build:lite`: Build without heavier production plugins for a quick test. 💯Calories only!

`analyze`: `"npm run build:stats && npm run start:analyzer"`

`build:stats`: Output build to `bundle-stats.json` for bundle analysis.

`start:analyzer`: Start the bundle analyzer.

`build:nomap`: Build without sourcemaps.


## Certs
Certs are kept in the `certs` directory. I generate them with (and maintain) [auto-dns-certs].

## Serving
HAProxy is the tls terminator and reverse proxy. Some files are proxied to a different directory so that they can be served from the site root. The [config](config/haproxy.cfg) is well documented and covers it pretty nicely.

Nginx serves static files for production.

## Caveats

There's some [rubbish](https://github.com/webpack/webpack/issues/4719) with weback output files and `[chunkhash]` not working when prefetching with magic comments. tl;dr:
```js
// Gotta use
chunkFilename: '[id].chunk.js',
// Not
chunkFilename: '[name].[chunkhash:8].chunk.js',
// For now 😤
```

## TODOS:
- [x] Bring in manifest helpers package
- [x] Fix the `'unsafe-inline'` in the csp with a nonce <br>
- [ ] Write them tests  <br>
- [ ] Continuous integration <br>
- [x] [Spruce up jodocs](https://devhints.io/jsdoc) <br>
- [x] Change to destructure sntax jsdoc where applicable https://github.com/microsoft/TypeScript/pull/30089 <br>
- [x] Add @throws to jodocs <br>
- [x] Add @module to jsdocs <br>
- [ ] Switch to fastify 🐯 <br>
- [ ] Add aria-attributes <br>
- [ ] Add structured data of some kind <br>
- [ ] Figure out why webpack resolvers are broken in less <br>
- [ ] Checkout the occasional error where winston logs without transports (I think it's related to async processes) <br>
- [ ] Consider switch to standard redis container <br>
- [ ] Look at using the writeFilesToDisk flag instead of write-files-plugin <br>
- [ ] Fix sourcemaps in less (are they even broken?) <br>
- [ ] [Exclude dev deps in webpack???](https://til.hashrocket.com/posts/ivze1rk2ey-speed-up-webpacker-by-excluding-dev-dependencies) <br>
- [ ] Consider defining process.env.PRODUCTION_FLAG so we're not doing string testing all the time - DEVELOPMENT_FLAG too. <br>

### Deployment
- [ ] Change ga id in keys <br>
- [ ] Turn on hsts <br>

## Feedback ✉️

[Website 🌐](https://jacobsmith.tech)

[js@jacobsmith.tech](mailto:js@jacobsmith.tech)

[https://github.com/limeandcoconut](https://github.com/limeandcoconut)

[@limeandcoconut 🐦](https://twitter.com/limeandcoconut)

Cheers!

## Credits
Orignally based off [react-ssr-setup].

## License

ISC, see [license](/license) for details.

[auto-dns-certs]: https://github.com/briancw/auto-dns-certs
[pm2]: https://www.npmjs.com/package/pm2
[100 on all Google Lighthouse tests]: /resources/lighthouse.gif
[react-ssr-setup]: https://github.com/manuelbieh/react-ssr-setup