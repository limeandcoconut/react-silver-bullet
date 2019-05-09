import * as React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import styles from './header.module.less'

class Header extends React.Component {

    render() {
        return (
            <nav className={styles.header} >
                <NavLink className={styles.navlink} to="/" exact>
                    Home
                </NavLink>
                <NavLink className={styles.navlink} to="/admin" exact>
                    Admin
                </NavLink>
            </nav>
        )
    }
}

// TODO: Router?
export default withRouter(Header)
