import * as React from 'react';
import transport from '../../modules/Transport/Transport';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';
import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/UserActions';
import * as signupActions from '../../actions/SignupActions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading/Loading';
import * as loginActions from '../../actions/LoginActions';

interface IProps {
    user?: any;
    signupForm?: any;
    history?: any;
    userActions?: any;
    signupActions?: any;
}

class Signup extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.changeSignupForm = this.changeSignupForm.bind(this);
    }

    public async registerUser() {
        const { signupForm }: any = this.props;
        const { signupUser, getUser }: any = this.props.userActions;

        await signupUser(signupForm);
        getUser();
    }

    public changeSignupForm(event): void {
        const input: any = event.target;
        const { setSignupForm }: any = this.props.signupActions;
        const updateSignup: any = {};
        updateSignup[input.dataset.dest] = input.value;
        setSignupForm(updateSignup);
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

                <div className='form-block signup'>
                    <div className='form-block-content'>
                        <div onClick={ this.goBack } className='form-block-content__back'>
                            <Image className='form-block-content__back-icon' src='static/imgs/back.png'/>
                        </div>
                        <form>
                            <Label className='form-block-content__label' text='Create an account'/>
                            <div className='form-block-content-inputs'>
                                <Input
                                    blockClass='user-login form-block-content-inputs-item'
                                    type='text'
                                    placeholder='Login'
                                    dest='login'
                                    onChange={this.changeSignupForm}
                                />
                                <Input
                                    blockClass='user-email form-block-content-inputs-item'
                                    type='text'
                                    placeholder='Email'
                                    dest='email'
                                    onChange={this.changeSignupForm}
                                />
                                <Input
                                    blockClass='password form-block-content-inputs-item'
                                    type='password'
                                    placeholder='Password'
                                    dest='password'
                                    onChange={this.changeSignupForm}
                                />
                                <Input
                                    blockClass='repeatPassword form-block-content-inputs-item'
                                    type='password'
                                    placeholder='Repeat password'
                                    onChange={() => {}}
                                />
                                <Button onClick={this.registerUser} className='login-button' text='Sign up'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private goBack(): void {
        const { history }: any = this.props;
        history.push('/');
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        signupForm: state.signupForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        signupActions: bindActionCreators(signupActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
