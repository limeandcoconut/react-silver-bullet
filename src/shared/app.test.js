// import { shallow } from 'enzyme';
/* global describe, it */
import unexpected from 'unexpected'
import unexpectedReact from 'unexpected-react'
import {MemoryRouter} from 'react-router-dom'
import React from 'react'

// jest.mock('react-router-dom')

const expect = unexpected.clone().use(unexpectedReact)

import App from './app'
import Header from './components/header'

describe('{app}', () => {
    // const defaultProps = {};

    it('tests something', () => {
        // shallow(<{app} {...defaultProps} />);
        expect(
            <MemoryRouter><App /></MemoryRouter>,
            'when rendered',
            'to contain',
            <MemoryRouter><Header /></MemoryRouter>,
            // <Header />
        )
    })
})

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
