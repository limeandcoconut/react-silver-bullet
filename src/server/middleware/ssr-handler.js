import * as React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Html from '../components/HTML'
import App from '../../shared/app'

// This is a handler not a middlware but it seems like the right place
/**
 * A handler that SSRs the React app.
 * @module serverRender
 * @function serverRender
 * @param {object} request Express like request object.
 * @param {object} reply Express like reply object.
 * @return {object} The passed reply.
 */
const serverRender = (request, reply) => {
    const staticContext = {}
    const content = renderToString(
        <Provider store={request.store}>

            <StaticRouter location={request.req.url} context={staticContext}>
                <App />
            </StaticRouter>

        </Provider>
    )

    const state = JSON.stringify(request.store.getState())

    if (staticContext.status) {
        reply.status(staticContext.status)
    }

    reply.type('text/html')
    return reply.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={[reply.res.locals.assetPath('bundle.css'), reply.res.locals.assetPath('vendor.css')]}
                    scripts={[reply.res.locals.assetPath('bundle.js'), reply.res.locals.assetPath('vendor.js')]}
                    state={state}
                    scriptNonce ={reply.res.locals.scriptNonce}
                >
                    {content}
                </Html>
            )
    )
}

export default serverRender
