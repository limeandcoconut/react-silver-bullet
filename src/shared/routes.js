import * as React from 'react'
import Home from './pages/home'
import NotFound from './components/not-found'
import Status from './components/status'

// TODO: This is an unused dep
// import {asyncComponent} from 'react-async-component'

// const Page2 = asyncComponent({
//     resolve: () => import(/* webpackChunkName: "chunk1", webpackPrefetch: true */ './pages/page2'),
// })

export default [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/418',
        exact: true,
        component: Status,
    },
    {
        path: '/*',
        component: NotFound,
    },
]
