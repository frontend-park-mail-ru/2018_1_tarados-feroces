import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import FirstComponent from './app/components/FirstComponent/FirstComponent'

// import './static/scss/main.scss';

const history = createBrowserHistory();

const App = () => (
    <Provider>
        <Router history={ history }>
            <Route path={ '/signup' } component={ FirstComponent as any }>
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);