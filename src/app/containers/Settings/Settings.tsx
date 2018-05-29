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
import * as settingsActions from '../../actions/SettingsActions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading/Loading';
import InputFile from '../../components/InputFile/InputFile';

import './Settings.scss';

interface IProps {
    user?: any;
    settingsForm?: any;
    history?: any;
    userActions?: any;
    settingsActions?: any;
    changeUser?: any;
}

class Settings extends React.Component<IProps, any> {

    private fileReader: FileReader = new FileReader();

    constructor(props: any) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changeSettingsForm = this.changeSettingsForm.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.changeImage = this.changeImage.bind(this);
    }

    public changeUser() {
        const { history, settingsForm }: any = this.props;
        const { updateUser } = this.props.userActions;
        updateUser(settingsForm);
        history.push('/me');
    }

    public changeSettingsForm(event): void {
        const input: any = event.target;
        const { setSettingsForm }: any = this.props.settingsActions;
        const updateSettings: any = {};
        updateSettings[input.dataset.dest] = input.value;
        setSettingsForm(updateSettings);
    }

    public render(): JSX.Element {
        const { user } = this.props;
        const { logoutUser }: any = this.props.userActions;

        if (user.isAuthorized === null || user.isAuthorized === undefined) {
            return (
                <Loading />
            );
        }
        if (!user.isAuthorized) {
            return (
                <Redirect to='/' />
            );
        }

        return (
            <div className='main-page'>
                <Header
                    isAuth={ true }
                    user={ user }
                    className='auth-page__header header'
                    logoutHandler={logoutUser}
                />

                <div className='form-block settings'>
                    <div className='form-block-content'>
                        <div onClick={ this.goBack } className='form-block-content__back'>
                            <Image className='form-block-content__back-icon' src='static/imgs/back.png'/>
                        </div>
                        <form>
                            <Label className='form-block-content__label' text='Settings'/>
                            <div className='settings-avatar'>
                                <Image
                                    className='settings-avatar__user-avatar'
                                    src={ user.avatar || '../static/imgs/user-logo.jpg' }
                                />
                            </div>
                            <div className='form-block-content-inputs'>
                                <InputFile
                                    onChange={this.changeAvatar}
                                    fileClass='file-avatar'
                                />
                                <Input
                                    blockClass='user-login form-block-content-inputs-item'
                                    type='text'
                                    placeholder='Login'
                                    dest='login'
                                    defaultValue={user.login}
                                    onChange={this.changeSettingsForm}
                                />
                                <Input
                                    blockClass='user-email  form-block-content-inputs-item'
                                    type='text'
                                    placeholder='Email'
                                    defaultValue={user.email}
                                    dest='email'
                                    onChange={this.changeSettingsForm}
                                />
                                <Button onClick={this.changeUser} className='login-button' text='Confirm'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private goBack(): void {
        const { history }: any = this.props;
        history.push('/me');
    }

    private changeAvatar(): void {
        const files = document.querySelector('.file-avatar').files;
        const file = files[files.length - 1];
        this.fileReader.readAsDataURL(file);
        this.fileReader.onload = this.changeImage;
    }

    private changeImage(): void {
        const { setSettingsForm }: any = this.props.settingsActions;
        const field = document.querySelector('.settings-avatar__user-avatar');
        field.src = this.fileReader.result;
        setSettingsForm({ 'avatar': this.fileReader.result })
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        settingsForm: state.settingsForm
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        userActions: bindActionCreators(userActions, dispatch),
        settingsActions: bindActionCreators(settingsActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
