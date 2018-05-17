import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import MainPage from './app/views/MainPage/MainPage';

import './static/css/main.scss';

const history = createBrowserHistory();

const App = () => (
    <Provider>
        <Router history={ history }>
            <Switch>
                <Route exact path={ '/' } component={ MainPage }/>
                <Route path={ '/login' } component={ MainPage }/>
                <Route path={ '/signup' } render={() => <p>text</p>} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);