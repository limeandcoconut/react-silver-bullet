import serveStatic from 'serve-static'
import expressStaticGzip from 'express-static-gzip'
import path from 'path'
import paths from '../../../config/paths'
import siteMeta from '../../../config/meta.js'

let {favicons: {default: faviconPath}} = siteMeta
faviconPath = faviconPath.split('?v')[0]

const serveStaticMiddleware = (app, opts, next) => {
    app.use(paths.publicPath, expressStaticGzip(path.join(paths.clientBuild, paths.publicPath), {
        enableBrotli: true,
        index: false,
        orderPreference: ['br'],
    }))

    app.use('/favicon.ico', serveStatic(path.join(paths.sharedMeta, faviconPath)))

    next()
}

// This allows the middleware to access the unencapsulated fastify instance
serveStaticMiddleware[Symbol.for('skip-override')] = true

export default serveStaticMiddleware
