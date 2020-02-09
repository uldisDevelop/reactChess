import React from 'react';
import styles from './Item.module.scss';
import classNames from 'classnames'
import { useRouteMatch, useHistory } from 'react-router-dom'


export default function Show({ show, activeShowId }) {

    const isSelected = activeShowId === show.id;

    const containerClasses = classNames({
        [styles.item]: true,
        [styles.itemSelected]: isSelected,
        'showActive': isSelected
    });

    let match = useRouteMatch();
    const history = useHistory();
    
    return (<div key={show.id} className={containerClasses} onClick={() => { history.push(`${match.url}/${show.id}`) }}>

        <div className={styles.contentContainer}>
            <div className={styles.title}>
                {show.title}                
            </div>

            <div className={styles.summary}>
                {show.text+(show.text.length===300?'...':'')}
            </div>
        </div>

    </div>)

}


