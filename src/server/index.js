import fastify from 'fastify'
import path from 'path'
import paths from '../../config/paths'
import manifestHelpers from 'express-manifest-helpers'
import {configureStore} from '../shared/store'
import serverRender from './middleware/ssr-handler'
import securityMiddleware from './middleware/security'
import serveStaticMiddleware from './middleware/static'
import bodyParser from 'body-parser'
import createHistory from '../shared/store/history'
import chalk from 'chalk'

require('dotenv').config()

process.env.HOST = process.env.HOST || 'http://localhost'
process.env.PORT = process.env.PORT || 8500

const app = fastify()

// Skip Ngninx on dev, do CSP and security stuff on production
if (process.env.NODE_ENV === 'development') {
    app.register(serveStaticMiddleware)
} else if (process.env.NODE_ENV === 'production') {
    app.register(securityMiddleware)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// This prepares for express-manifest-helpers before it runs
app.addHook('onRequest', (request, reply, done) => {
    reply.res.locals = {}
    done()
})

// This might be a useful crutch in the future
// Decorate fastify request with url from request.req
// app.decorateRequest('decorateUrl', function() {
//     this.url = this.req.url
// })

// Create store after middlewares responded and the request will difinitely be matching against routes
app.addHook('preHandler', (request, reply, done) => {
    const history = createHistory({initialEntries: [request.req.url]})
    request.store = configureStore({history})
    done()
})

// Send asset manifest
const manifestPath = path.join(paths.clientBuild, paths.publicPath)
app.use(
    manifestHelpers({
        manifestPath: path.join(manifestPath, '/asset-manifest.json'),
    })
)

// 404 and other status codes are generally handled here at an app level
app.get('*', serverRender)

app.listen(process.env.PORT, () => {
    console.log(`[${new Date().toISOString()}]\n` +
    `Running in ${chalk.magenta(process.env.NODE_ENV)} mode: 🌎 ${chalk.blue(`${process.env.HOST}:${process.env.PORT}`)}`)
})

/** @module app */
export default app
