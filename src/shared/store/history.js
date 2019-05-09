import {createMemoryHistory, createBrowserHistory} from 'history'

/**
 * Create a history object for store and router. Returns a browser history on client, memory history on server.
 * @function createUniversalHistory
 * @param  {array} initialEntries An array of history entiries to start with.
 * @return {object} A history object.
 */
export const createUniversalHistory = ({initialEntries = []} = {}) => {
    // TODO: Fix unedfined thing here
    if (__BROWSER__) {
        const history = window.browserHistory || createBrowserHistory({initialEntries})
        if (process.env.NODE_ENV === 'development' && !window.browserHistory) {
            window.browserHistory = history
        }
        return history
    }
    return createMemoryHistory({initialEntries})
}

export default createUniversalHistory
