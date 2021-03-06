import {createStore, applyMiddleware, compose} from 'redux'
import createRootReducer from './rootReducer'
import {routerMiddleware} from 'connected-react-router'

// history MUST be passed in. It's crucial that the same history is passed to rootReducer and routerMiddleware as is
// used elsewhere in the app
/**
 * Setup the store, import reducers, inline initialState, manage devtool integration.
 * @function configureStore
 * @param  {object} initialState The state of the app on store creation. Default: empty object.
 * @param  {object[]} middleware    An array of midlewares to add to composeEnhancers. Default: empty array.
 * @param  {object} history      A history to be passed to routerMiddleware and createRootReducer. Required.
 * @return {object} The completed store.
 */
export const configureStore = ({initialState = {}, middleware = [], history} = {}) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({actionsBlacklist: []})

    const composeEnhancers = devtools || compose

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...[routerMiddleware(history)].concat(...middleware)))
    )

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./rootReducer', () =>
                store.replaceReducer(require('./rootReducer').default)
            )
        }
    }

    return store
}

export default configureStore
