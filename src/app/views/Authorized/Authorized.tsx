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
            <div class="auth-page">
                <Header class="auth-page__header header">
                    <div class="header-logo">
                        <Image class="header-logo-content" src="../images/Deadlinez.png"></Image>
                    </div>
                    <div class="button button-play" click="(){play();}">
                        <p class="button-play__value">PLAY</p>
                    </div>
                    <UserInfo login="{{login}}" coins="645" points="1080" avatar="{{{avatar}}}">
                        <SettingsButton></SettingsButton>
                        <SignoutButton></SignoutButton>
                    </UserInfo>
                </Header>

                <div class="auth-page__content">
                    <div class="auth-page__content-left">
                        <div class="auth-page__content-left-modal">
                            <div class="auth-page__content-left-modal-header modal-header">
                                <AuthHeaderPoint class="news-header" click="(){ goToNews(); }">News</AuthHeaderPoint>
                                <AuthHeaderPoint class="leaderboard" click="(){ goToScore(); }">Scoreboard</AuthHeaderPoint>
                            </div>
                            <AuthContent id="modal-data"></AuthContent>
                        </div>
                    </div>

                    <div class="friends-modal hidden">
                        <FriendAction>Invite</FriendAction>
                        <FriendAction>Chat</FriendAction>
                    </div>

                    <div class="auth-page__content-right">

                        <div class="auth-page__content-right-hide">
                            <HideFriendsButton click="(){hideFriends();}"></HideFriendsButton>
                            <div class="friends">
                                <div class="friends-header">
                                    <div class="friends-header-point">
                                        <p class="friends-header-point-value">Friends</p>
                                    </div>
                                    <div class="friends-header-point">
                                        <p class="friends-header-point-value">People</p>
                                    </div>
                                </div>
                                <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                                <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                                <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                                <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                            </div>
                        </div>

                        <Party class="content-right-party"></Party>
                    </div>
                </div>
            </div>


        );
    }
}
