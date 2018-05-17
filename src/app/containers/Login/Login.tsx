import * as React from 'react';

import '../../components/Form/Form.scss';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';

export default class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

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
                                <Button className='login-button' text='Sign In'/>
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
}
