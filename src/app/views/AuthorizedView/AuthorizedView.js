import BaseView from '../BaseView/BaseView'
import httpModule from '../../modules/HttpModule/HttpModule'
import userService from '../../modules/UserService/UserService'
import router from '../../modules/Router/Router'

export default class AuthorizedView extends BaseView {

    preRender() {
        return httpModule.doGet('/me').then(
            (response) => {
                this.context = response;
                if (this.context.avatar === null) {
                    this.context.avatar = '../images/user-logo.jpg'
                }
            }
        );
    }

    render() {
        return `<div class="auth-page">
        <Header class="auth-page__header header">
            <div class="header-logo">
                <Image class="header-logo-content" src="../images/Deadlinez.png"></Image>
            </div>
            <div class="button button-play">
                <p class="button-play__value">PLAY</p>
            </div>
            <UserInfo login="{{login}}" coins="645" points="1080" avatar="{{avatar}}">
                <SettingsButton click="(){goToSettings();}"></SettingsButton>
                <SignoutButton click="(){signOut();}"></SignoutButton>
            </UserInfo>
        </Header>

        <div class="auth-page__content">
            <div class="auth-page__content-left">
                <div class="auth-page__content-left-modal">
                    <div class="auth-page__content-left-modal-header modal-header">
                        <AuthHeaderPoint click="">News</AuthHeaderPoint>
                        <AuthHeaderPoint click="">Scoreboard</AuthHeaderPoint>
                        <AuthHeaderPoint click="">About</AuthHeaderPoint>
                    </div>
                    <AuthContent></AuthContent>
                </div>
            </div>

            <div class="friends-modal hidden">
                <FriendAction>Invite</FriendAction>
                <FriendAction>Chat</FriendAction>
                <FriendAction>View profile</FriendAction>
            </div>

            <div class="auth-page__content-right">

                <div class="auth-page__content-right-friends">
                    <HideFriendsButton click="(){hideFriends();}"></HideFriendsButton>
                    <div class="friends">
                        <div class="friends-label">
                            <p class="friends-label-value">Friends</p>
                        </div>
                        <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                        <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                        <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                        <Friend avatar="../images/user-logo.jpg" login="Kabachok" click="(event){showFriendActions(event);}"></Friend>
                    </div>
                </div>

                <div class="content-right-party">
                    <div class="content-right-party-friend">
                        <Image class="content-right-party-friend-logo" src="../images/user-logo.jpg"></Image>
                    </div>
                    <div class="content-right-party-friend">
                        <Image class="content-right-party-friend-logo" src="../images/user-logo.jpg"></Image>
                    </div>
                    <div class="content-right-party-friend">
                        <Image class="content-right-party-friend-logo" src="../images/user-logo.jpg"></Image>
                    </div>
                    <div class="content-right-party-friend">
                        <Image class="content-right-party-friend-logo" src="../images/user-logo.jpg"></Image>
                    </div>
                    <div class="content-right-party-invite">
                        <Image class="content-right-party-invite-button" src="../images/add.png"></Image>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

window.goToSettings = () => router.go('/settings/');

window.signOut = () => {
    httpModule.doPost('/signout').then(
        (response) => {
            userService.userLogout();
            router.go('/');
        }
    );
};


window.hideFriends = () => {
    const hideValue = document.querySelector('.auth-page__content-right-friends-icon-value');

    document.querySelector('.friends').classList.toggle('hidden');
    if (hideValue.classList.contains('rotate-close')) {
        hideValue.classList.add('rotate-open');
        hideValue.style.transform = 'rotate(180deg)';
        hideValue.classList.remove('rotate-close');
    } else {
        hideValue.classList.add('rotate-close');
        hideValue.style.transform = 'rotate(0deg)';
        hideValue.classList.remove('rotate-open');
    }
    document.querySelector('.content-right-party').classList.toggle('hidden');
};



window.showFriendActions = (event) => {
    const modal = document.querySelector('.friends-modal');
    const icon = event.currentTarget;
    console.log(modal);
    console.log(icon);
    const x = icon.x - 200;
    console.log(icon.left);
    modal.style.left = `${x}px`;
    modal.style.top = `${icon.y}px`;
    modal.classList.toggle('hidden');
};
