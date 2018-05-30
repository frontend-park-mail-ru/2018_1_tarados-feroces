import * as React from 'react';

import '../../components/Form/Form.scss';

import Validation from '../../modules/Validator/index';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';
import transport from "../../modules/Transport/Transport";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../../actions/UserActions";
import * as loginActions from "../../actions/LoginActions";
import {Redirect} from 'react-router';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

interface IProps {
    user?: any;
    loginForm?: any;
    history?: any;
    userActions?: any;
    loginActions?: any;
}

class Login extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.changeLoginForm = this.changeLoginForm.bind(this);
        this.loginWithEnter = this.loginWithEnter.bind(this);
        this.state = {
            errors: {}
        }
    }

    public loginWithEnter(event: any): any {
        if (event.keyCode === 13 && event.type === 'keypress') {
            this.loginUser();
        }
    }

    public componentWillMount(): void {
        window.addEventListener('keypress', this.loginWithEnter);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('keypress', this.loginWithEnter);
    }

    public async loginUser() {
        const { loginForm } = this.props;
        const { loginUser, getUser }: any = this.props.userActions;
        const errors: any = {};
        Validation(loginForm, errors);
        this.setState({errors: errors});
        for (const key in errors) {
            if (errors[key].length) {
                return;
            }
        }
        await loginUser(loginForm);
        getUser();

    }

    public changeLoginForm(event): void {
        const input: any = event.target;
        const { setLoginForm }: any = this.props.loginActions;
        const updateLogin: any = {};
        updateLogin[input.dataset.dest] = input.value;
        setLoginForm(updateLogin);
    }

    public render(): JSX.Element {
        const { user } = this.props;
        const { errors } = this.state;

        if (user.isAuthorized === null || user.isAuthorized === undefined) {
            return (
                <Loading />
            );
        }
        if (user.isAuthorized) {
            return (
                <Redirect to='/me/' />
            );
        }
        return (
            <div className='main-page'>
                <Header className='main-page__header'>
                    <div className='header-logo'>
                        <div className='header-logo-content'/>
                    </div>
                </Header>

                <div className='form-block login'>
                    <div className='form-block-content'>
                        <div onClick={this.goBack} className='form-block-content__back'>
                            <Image className='form-block-content__back-icon' src='static/imgs/back.png'/>
                        </div>
                        <form method={'POST'}>
                            <Label className='form-block-content__label' text='Sign In'/>
                            <div className='form-block-content-inputs'>
                                <Input
                                    blockClass='user-login form-block-content-inputs-item'
                                    type='text'
                                    placeholder='Login'
                                    dest='login'
                                    onChange={this.changeLoginForm}
                                    errorText={errors.login}
                                />
                                <Input
                                    blockClass='password form-block-content-inputs-item'
                                    type='password'
                                    placeholder='Password'
                                    dest='password'
                                    onChange={this.changeLoginForm}
                                    errorText={errors.password}
                                />
                                <Button onClick={this.loginUser} className='login-button' text='Sign In'/>
                            </div>
                        </form>
                    </div>
                </div>
                <Error/>
            </div>
        );
    }

    private goBack(): void {
        const { history } = this.props;
        history.push('/');
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loginForm: state.loginForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
