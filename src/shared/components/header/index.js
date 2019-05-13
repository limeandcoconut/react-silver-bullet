import * as React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './header.module.less'

/**
 * @module
 * @class
 * @extends React.Component
 */
class Header extends React.Component {

    render() {
        return (
            <nav className={styles.header} >
                <div className={styles.layout}>
                    <NavLink className={styles.navlink} to="/" exact>
                        Home
                    </NavLink>
                    <NavLink className={styles.navlink} to="/not-a-page" exact>
                        404
                    </NavLink>
                    <NavLink className={styles.navlink} to="/418" exact>
                        418
                    </NavLink>
                </div>
            </nav>
        )
    }
}

export default Header
