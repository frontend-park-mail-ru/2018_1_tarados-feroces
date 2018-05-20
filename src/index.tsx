import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/containers/App/App';
import {Provider} from "react-redux";
import configureStore from "./app/store/store";

const store = configureStore({});

const App1 = () => (
    <Provider store = { store }>
        <App />
    </Provider>
);

ReactDOM.render(
    <App1 />,
    document.getElementById('root')
);
