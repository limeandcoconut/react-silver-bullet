import fastify from 'fastify'
import serveStatic from 'serve-static'
import path from 'path'
import chalk from 'chalk'
import manifestHelpers from 'express-manifest-helpers'
import {configureStore} from '../shared/store'
import serverRender from './render'
import paths from '../../config/paths'
import bodyParser from 'body-parser'
import createHistory from '../shared/store/history'

import expressStaticGzip from 'express-static-gzip'

import featurePolicy from 'feature-policy'
import frameguard from 'frameguard'
import hsts from 'hsts'
import csp from 'helmet-csp'
import ieNoOpen from 'ienoopen'
import noSniff from 'dont-sniff-mimetype'
import xssFilter from 'x-xss-protection'
import {randomId} from './utils.js'
import siteMeta from '../../config/meta.js'

let {favicons: {default: faviconPath}} = siteMeta
faviconPath = faviconPath.split('?v')[0]

require('dotenv').config()

process.env.HOST = process.env.HOST || 'http://localhost'
process.env.PORT = process.env.PORT || 8500

const app = fastify()

// Use Nginx to serve static assets in production
if (process.env.NODE_ENV === 'development') {
    app.use(paths.publicPath, expressStaticGzip(path.join(paths.clientBuild, paths.publicPath), {
        enableBrotli: true,
        index: false,
        orderPreference: ['br'],
    }))

    app.use('/favicon.ico', serveStatic(path.join(paths.sharedMeta, faviconPath)))
}

// Don't bother with security on dev
if (process.env.NODE_ENV === 'production') {
    // Setup feature policy
    const contentNone = ['\'none\'']
    app.use(featurePolicy({
        features: {
            camera: [...contentNone],
            geolocation: [...contentNone],
            microphone: [...contentNone],
            payment: [...contentNone],
        },
    }))

    // Set up content-security-policy
    app.use((request, response, next) => {
        response.locals.scriptNonce = randomId()
        next()
    })

    // TODO: Add this to config
    const contentSelf = ['\'self\'', 'local.jacobsmith.tech', 'blob:', 'data:']
    const contentAnalytics = ['*.google-analytics.com', 'google-analytics.com']
    const contentFonts = ['*.fonts.gstatic.com', 'fonts.gstatic.com']
    app.use(csp({
        directives: {
            defaultSrc: contentSelf.concat(contentAnalytics),
            fontSrc: contentSelf.concat(contentFonts),
            imgSrc: contentSelf.concat(contentAnalytics, 'http.cat'),
            prefetchSrc: contentSelf.concat(contentFonts),
            connectSrc: contentSelf.concat(contentAnalytics),
            // TODO: Add a report URI
            // reportUri
            scriptSrc: contentSelf.concat(contentAnalytics, (request, response) => `'nonce-${response.locals.scriptNonce}'`),
        },
    }))

    // Prevent iframes embedding this page
    app.use(frameguard({action: 'deny'}))

    // Set up hsts
    // Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
    // const sixtyDaysInSeconds = 5184000
    // app.use(hsts({
    //   maxAge: sixtyDaysInSeconds
    // }))

    // Used for an old ie thing
    app.use(ieNoOpen())
    // Don't sniff mimetype
    app.use(noSniff())

    // Prevent xss reflection
    // Sets "X-XSS-Protection: 1; mode=block".
    app.use(xssFilter())
    // TODO: Add reporting
    // app.use(xssFilter({ reportUri: '/report-xss-violation' }))
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
