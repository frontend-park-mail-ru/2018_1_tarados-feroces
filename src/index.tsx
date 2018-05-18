import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import MainPage from './app/containers/MainPage/MainPage';
import Login from './app/containers/Login/Login';
import Signup from './app/containers/Signup/Signup';
import Authorized from './app/containers/Authorized/Authorized';
import configureStore from './app/store/store';

import './static/css/main.scss';

const store = configureStore({});
const history = createBrowserHistory();

const App = () => (
    <Provider store={ store }>
        <Router history={ history }>
            <Switch>
                <Route exact path={ '/' } component={ MainPage } />
                <Route path={ '/login' } component={ Login } />
                <Route path={ '/signup' } component={ Signup } />
                <Route path={ '/me' } component={ Authorized } />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);