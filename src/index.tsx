import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import MainPage from './app/containers/MainPage/MainPage';
import Login from './app/containers/Login/Login';
import Signup from './app/containers/Signup/Signup';

import './static/css/main.scss';

const history = createBrowserHistory();

const App = () => (
    <Provider>
        <Router history={ history }>
            <Switch>
                <Route exact path={ '/' } component={ MainPage }/>
                <Route path={ '/login' } component={ Login }/>
                <Route path={ '/signup' } component={ Signup } />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);