import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.scss'

export default function NavBar() {
    let { pathname } = useLocation();

    function getClassName(route) {
        return pathname.startsWith(route) ? styles.selected : '';
    }

    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <div className={styles.title}>Faire réagir l'application</div>                
                <Link to="/items" className={getClassName('/items')}>Items</Link>
                <Link to="/about" className={getClassName('/about')}>About</Link>
                <Link to="/users" className={getClassName('/users')}>Users</Link>
            </nav>
        </div>
    )
}
