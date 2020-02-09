import React,{useState} from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import styles from './_Page.module.scss';
import List from './List'
import Details from './Details'


export default function Page() {
    let match = useRouteMatch();

    const [state, setState] = useState({
        page: 1,
        totalPages: 1,
        pageSize:10
    });

    function updateField(field, value) {        
        setState({ ...state, [field]: value });
    };
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.page}>

                <Switch>
                    <Route path={match.path} exact>
                        <List state={state} updateField={updateField}/>
                    </Route>

                    <Route path={`${match.path}/:id`}>
                        <Details />
                    </Route>
                </Switch>

            </div>
        </div>
    )
}


