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

class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    public loginUser(): void {
        const { history } = this.props;
        const form: any = {
            login: 'a',
            password: 'a'
        };

        transport.doPost('/signin', form)
            .then(
                (response: any) => {
                    const { setUser } = this.props.userActions;
                    transport.doGet('/user')
                        .then(
                            (response: any) => {
                                console.log(response);
                                setUser(response);
                                history.push('/me');
                            },
                            (reject: any) => {
                                console.log('Can`t get user info:(');
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
                                />
                                <Input
                                    block-class='user-password'
                                    type='password'
                                    placeholder='Password'
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
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
