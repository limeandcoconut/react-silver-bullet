// import { shallow } from 'enzyme';
/* global describe, it */
import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
// import {compose, applyMiddleware} from 'redux'
import {createMemoryHistory} from 'history'
import {routerMiddleware, connectRouter} from 'connected-react-router'
import toast from './store/toast/reducer'

const history = createMemoryHistory({initialEntries: ['/']})

const initialState = {
    toast,
    router: history,
}

const store = configureStore([routerMiddleware(history)])(initialState)
// const store = configureStore()({
//     // createRootReducer(history),
//     {},
//     // compose(applyMiddleware(...[routerMiddleware(history)].concat(...middleware))),
// })

// jest.mock('react-router-dom')

const expect = unexpected.clone().use(unexpectedReact)

import App from './app'
const WrappedApp = App.WrappedComponent
console.log(App)
console.log(WrappedApp)

import Header from './components/header'

describe('{app}', () => {
    // const defaultProps = {};

    it('tests something', () => {
        // shallow(<{app} {...defaultProps} />);
        expect(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>,
            'when deeply rendered',
            'to contain',
            <Provider />,
            // <div />,
            // <Header />
        )
    })
})

// import {createStore, applyMiddleware, compose} from 'redux'
// import createRootReducer from './rootReducer'
// import {routerMiddleware} from 'connected-react-router'

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
// export const configureStore = ({initialState = {}, middleware = [], history} = {}) => {

//     // const store = createStore(
//     //     createRootReducer(history),
//     //     initialState,
//     //     compose(applyMiddleware(...[routerMiddleware(history)].concat(...middleware)))
//     // )

//     return store
// }

// // Link.react.test.js
// import React from 'react';
// import Link from '../Link.react';
// import renderer from 'react-test-renderer';

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     <Link page="http://www.facebook.com">Facebook</Link>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// var unexpected = require('unexpected');
// var unexpectedReact = require('unexpected-react');

// var React = require('react');
// var ReactTestUtils = require('react-dom/test-utils');

// // Require the component we want to test
// var MyComponent = require('../MyComponent');

// // Declare our `expect` instance to use unexpected-react
// var expect = unexpected.clone()
//     .use(unexpectedReact);

// describe('MyComponent', function () {
//     it('renders a button', function () {
//         var renderer = ReactTestUtils.createRenderer();
//         renderer.render(<MyComponent />);
//         expect(renderer, 'to have rendered', <button>Click me</button>);
//     });
// });
