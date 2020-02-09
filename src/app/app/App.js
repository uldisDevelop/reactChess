import React from 'react';
import Items from '../items/components/_Page';
import Home from '../home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from './App.module.scss'
import NavBar from './NavBar'


export default function App() {

    return (
        <Router>
            <div className={styles.app}>

                <NavBar />

                <div className={styles.contentContainer}>
                    <Switch>
                        <Route path="/items"><Items /></Route>
                        <Route path="/users"><center>Users</center></Route>
                        <Route path="/about"><center>About</center></Route>
                        <Route path="/" exact><Home /></Route>
                    </Switch>
                </div>

            </div>
        </Router>
    )
}