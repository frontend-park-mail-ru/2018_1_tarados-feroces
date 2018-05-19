import * as React from 'react';

import {connect, Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';

import MainPage from '../MainPage/MainPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Authorized from '../Authorized/Authorized';
import configureStore from '../../store/store';

import '../../../static/css/main.scss';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/UserActions';
import transport from '../../modules/Transport/Transport';

const history = createBrowserHistory();

class App extends React.Component<any, any> {

    public componentWillMount(): void {
        const { setUser } = this.props.userActions;

        transport.doGet('/isauthorized')
            .then(
                (response: any) => {
                    const isAuth = response.is_authorized;

                    isAuth && transport.doGet('/user')
                        .then(
                            (response: any) => {
                                const user: any = response.user;
                                user.isAuthorized = isAuth;
                                setUser(user);
                            }
                        );
                },
                (error: any) => {
                    console.log(error.message);
                }
            );
    }

    public render(): JSX.Element {
        return (
            <Router history={ history }>
                <Switch>
                    <Route exact path={ '/' } component={ MainPage } />
                    <Route path={ '/login' } component={ Login } />
                    <Route path={ '/signup' } component={ Signup } />
                    <Route path={ '/me' } component={ Authorized } />
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
