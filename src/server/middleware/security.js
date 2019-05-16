import featurePolicy from 'feature-policy'
import frameguard from 'frameguard'
import hsts from 'hsts'
import csp from 'helmet-csp'
import ieNoOpen from 'ienoopen'
import noSniff from 'dont-sniff-mimetype'
import xssFilter from 'x-xss-protection'
import {randomId} from '../utils.js'

const securityMiddleware = (app, opts, next) => {

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
            scriptSrc: contentSelf.concat(
                contentAnalytics,
                (request, response) => `'nonce-${response.locals.scriptNonce}'`,
            ),
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
    next()
}

// This allows the middleware to access the unencapsulated fastify instance
securityMiddleware[Symbol.for('skip-override')] = true

export default securityMiddleware
