import * as React from 'react'
import Helmet from 'react-helmet'
// import {connect} from 'react-redux'
import styles from './home.module.less'
import {productionHost} from '../../../../config/config.js'

/**
 * @module
 * @class
 * @extends React.Component
 */
class Home extends React.Component {

    render() {

        return (
            <div className={styles.wrapper} >
                <Helmet>
                    <link rel="canonical" href={productionHost} />
                </Helmet>
            </div>
        )
    }
}

// const mapDispatchToProps = {
// }

// const mapStateToProps = ({
// }) => {
// }

// export default connect(
// mapStateToProps,
// mapDispatchToProps,
// )(Home)

export default Home
