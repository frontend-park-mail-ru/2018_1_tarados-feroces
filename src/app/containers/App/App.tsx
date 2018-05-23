import * as React from 'react';
import {connect, Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import {bindActionCreators} from 'redux';
import * as PathConstants from '../../constants/PathsConstants';

import MainPage from '../MainPage/MainPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Authorized from '../Authorized/Authorized';
import Settings from '../Settings/Settings';
import GameContainer from '../Game/Game';

import '../../../static/css/main.scss';

import * as userActions from '../../actions/UserActions';

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    public componentWillMount(): void {
        const { getUser } = this.props.userActions;
        getUser();
    }

    public render(): JSX.Element {
        return (
            <Router history={ history }>
                <Switch>
                    <Route exact path={ PathConstants.MAINPAGE } component={ MainPage } />
                    <Route path={ PathConstants.LOGIN } component={ Login } />
                    <Route path={ PathConstants.SIGNUP } component={ Signup } />
                    <Route path={ PathConstants.AUTHORIZED } component={ Authorized } />
                    <Route path={ PathConstants.SETTINGS } component={ Settings } />
                    <Route path={ PathConstants.SINGLE } component={ GameContainer } />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
