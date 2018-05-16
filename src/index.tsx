import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import MainPage from './app/views/MainPage/MainPage';

// import './static/css/main.scss';

const history = createBrowserHistory();

const App = () => (
    <Provider>
        <Router history={ history }>
            {/*<Switch>*/}
                <Route path={ '/' } component={ MainPage }/>
            {/*</Switch>*/}
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);