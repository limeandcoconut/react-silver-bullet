import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import toast from './toast/reducer'
/**
 * Runs connectRouter and combineReducers.
 * @function createRootReducer
 * @param  {object} history A history to provide the router.
 * @return {object} The root reducer for the store.
 */
const createRootReducer = (history) => combineReducers({
    toast,
    router: connectRouter(history),
})

export default createRootReducer
