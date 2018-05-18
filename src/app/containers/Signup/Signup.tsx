import * as React from 'react';
import transport from '../../modules/Transport/Transport';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';

export default class Signup extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    public registerUser() {
        const form: any = {
            email: 'a',
            login: 'a',
            password: 'a'
        };

        transport.doPost('/signup', form)
            .then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                  console.log(error.message);
                }
            );
    }

    public render() {
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
                                    block-class='user-email'
                                    type='text'
                                    placeholder='Email'
                                />
                                <Input
                                    block-class='user-login'
                                    type='text'
                                    placeholder='Login'
                                />
                                <Input
                                    block-class='user-password'
                                    type='password'
                                    placeholder='Password'
                                />
                                <Input
                                    block-class='user-repeat-password'
                                    type='password'
                                    placeholder='Repeat password'
                                />
                                <Button onClick={this.registerUser} className='login-button' text='Sign up'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private goBack() {
        const { history } = this.props;
        history.push('/');
    }

    private goAuth() {
        const { history } = this.props;
        history.push('/me');
    }
}
