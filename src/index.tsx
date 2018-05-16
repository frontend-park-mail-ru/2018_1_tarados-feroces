import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import MainPage from './app/views/MainPage/MainPage';

// import './static/scss/main.scss';

const history = createBrowserHistory();

const App = () => (
    <Provider>
        <Router history={ history }>
            <Route path={ '/' } component={ MainPage as any }>
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);