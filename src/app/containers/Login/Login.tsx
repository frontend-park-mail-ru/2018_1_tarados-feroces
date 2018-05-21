import * as React from 'react';

import '../../components/Form/Form.scss';

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
    }

    public async loginUser() {
        const { loginForm } = this.props;
        const { loginUser, getUser }: any = this.props.userActions;
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

        if (user.isAuthorized === null || user.isAuthorized === undefined) {
            return (
                <Loading />
            );
        }
        if (user.isAuthorized) {
            return (
                <Redirect to='/me' />
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
                                    block-class='user-name'
                                    type='text'
                                    placeholder='Login'
                                    dest='login'
                                    onChange={this.changeLoginForm}
                                />
                                <Input
                                    block-class='user-password'
                                    type='password'
                                    placeholder='Password'
                                    dest='password'
                                    onChange={this.changeLoginForm}
                                />
                                <Button onClick={this.loginUser} className='login-button' text='Sign In'/>
                            </div>
                        </form>
                    </div>
                </div>
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
        loginForm: state.loginForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
