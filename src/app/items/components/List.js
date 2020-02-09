import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './List.module.scss';
import Item from './Item'
import { fetchItems } from '../module'
import Components from '../../../commons'
import classNames from 'classnames'

const state = (store) => ({
    items: store.items.items,
    loading: store.items.loading,
});

const actions = {
    fetchItems
}

function List(props) {

    const {
        items,
        loading,
        fetchItems,
        state,
        updateField
    } = props;

    const { page, totalPages, pageSize } = state;

    function goToNextPage() {
        if (page < totalPages) {
            updateField('page', page + 1)
        }
    };

    function goToPrevPage() {
        if (page > 1) {
            updateField('page', page - 1)
        }
    };

    useEffect(() => {
        fetchItems(page, pageSize, (itemCount) => {
            updateField('totalPages', Math.ceil(itemCount / pageSize));
        });
    }, [page])


    if (loading) {
        return <Components.Loader />
    }

    const classNamesNextBtn = classNames(styles.pageingLink, {[styles.linkInactive]: page >=totalPages})
    const classNamesPrevBtn = classNames(styles.pageingLink, {[styles.linkInactive]: page <= 1})


    return (<div className={styles.container}>

        <div className={styles.list}>
            {items.map((item) => {
                return <Item key={item.id} show={item} />
            })}
        </div>

        <div className={styles.pagination}>
            <span className={classNamesPrevBtn} onClick={goToPrevPage}>&#x2190; prev page</span>
            <span>{`${page} / ${totalPages}`}</span>
            <span className={classNamesNextBtn} onClick={goToNextPage}>next page &#x2192;</span>
        </div>
        
    </div>
    )
}


export default connect(state, actions)(List);