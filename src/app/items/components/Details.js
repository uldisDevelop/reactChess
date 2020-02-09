import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import styles from './Details.module.scss'
import { fetchItem, clearDetails } from '../module'
import { useHistory } from "react-router-dom"
import Components from '../../../commons'
import { onKeyboard } from '../../../utils/index'


const state = (store) => ({
    item: store.items.item,
    itemLoading: store.items.itemLoading,
});

const actions = {
    clearDetails,
    fetchItem
}

function Details(props) {

    const history = useHistory();
    const match = useRouteMatch();
    const { id } = match.params;

    const {
        clearDetails,
        fetchItem,
        item,
        itemLoading
    } = props;

    useEffect(() => {
        fetchItem(id);
        return clearDetails;
    }, [])

    onKeyboard(['esc', 'backspace'], () => {
        history.goBack();
    })

    if (itemLoading) {
        return <Components.Loader />
    }

    return (
        <div>
            <div className={styles.backBtn} onClick={history.goBack}>&#x2190; Back</div>

            {item &&
                <div className={styles.detailsText}>
                    <h1>{item.title}</h1>
                    <div>{item.text}</div>
                </div>
            }

        </div>
    )

}


export default connect(state, actions)(Details);