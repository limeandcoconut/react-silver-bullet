import * as React from 'react'
import Status from '../status'

/**
 * @module
 * @class
 * @extends React.Component
 */
const NotFound = () => (
    <Status code={404}>
        <>
            <h1>Not Found</h1>
        </>
    </Status>
)

export default NotFound
