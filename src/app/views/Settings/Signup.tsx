import * as React from 'react';

import './MainPage.scss';

import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';
import UserInfo from '../../components/Image/Image';

export default class Settings extends React.Component<any, any> {

    public render() {
        return (
            <div className='main-page'>
                <Header className='auth-page__header header'>
                    <div className='header-logo'>
                        <Image className='header-logo-content' src='../images/Deadlinez.png'/>
                    </div>
                    <div className='button button-play'>
                        <p className='button-play__value'>PLAY</p>
                    </div>
                    <UserInfo
                        login={this.props.userLogin}
                        coins={this.props.userCoins}
                        points={this.props.userPoints}
                        avatar={this.props.userAvatar}
                    />
                </Header>

                <div className='form-block login'>
                    <div className='form-block-content'>
                        <div className='form-block-content__back'>
                            <Image className='form-block-content__back-icon' src='images/back.png'/>
                        </div>
                        <Form>
                            <Label>Settings</Label>
                            <div className='settings'>
                                <div className='settings-avatar'>
                                    <Image className='settings-avatar__user-avatar' src={this.props.avatar}/>
                                </div>

                                <div className='form-block-content-inputs'>
                                    <InputFile file-class='file-avatar'/>
                                    <Input
                                        block-class='user-name'
                                        type='text'
                                        placeholder='Login'
                                        value={this.props.login}
                                        />
                                    <Input
                                        block-class='user-email'
                                        type='text'
                                        placeholder='E-mail'
                                        value={this.props.email}
                                        />

                                    <Button className='signup-button'>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
