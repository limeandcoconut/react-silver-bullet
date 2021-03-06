import * as React from 'react'
import Helmet from 'react-helmet'

/**
 * @module
 * @class
 * @extends React.Component
 */
export default class HTML extends React.Component {
    render() {
        const head = Helmet.renderStatic()
        const {children, scripts = [], css = [], state = {}, scriptNonce = null} = this.props

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {css.map((href) => {
                        return <link key={href} rel="stylesheet" href={href} />
                    })}
                    <script
                        nonce={scriptNonce}
                        dangerouslySetInnerHTML={{
                            __html: `window.__PRELOADED_STATE__ = ${state}`,
                        }}
                    />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: children}} />
                    {scripts.map((src) => {
                        return <script key={src} src={src} />
                    })}
                </body>
            </html>
        )
    }
}
