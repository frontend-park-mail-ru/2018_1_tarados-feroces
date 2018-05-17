import * as React from 'react';

import './MainPage.scss';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';

export default class Login extends React.Component<any, any> {

    public render() {
        return (
            <div className='main-page'>
                <Header className='main-page__header'>
                    <div className='header-logo'>
                        <div className='header-logo-content'/>
                    </div>
                </Header>

                <div className='form-block login'>
                    <div className='form-block-content'>
                        <div className='form-block-content__back'>
                            <Image className='form-block-content__back-icon' src='images/back.png'/>
                        </div>
                        <Form>
                            <Label className='form-block-content__label'>Sign In</Label>
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
                                <Button className='login-button'>Sign In</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
