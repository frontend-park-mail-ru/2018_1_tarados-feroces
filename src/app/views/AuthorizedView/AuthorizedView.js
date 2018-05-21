import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import userService from '../../modules/UserService/UserService';
import router from '../../modules/Router/Router';
// import ws from '../../modules/WebSocket/WebSocket';
// import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';

export default class AuthorizedView extends BaseView {

    update(context = {}) {
        this.context = context;
    }

    preRender() {
        userService.openWebSocket();
        console.log(userService.data);
        this.context = userService.data;
        this.context.inFriends = true;


        this.context.request = {avatar: '../images/user-logo.jpg', login: 'Andrew', message: 'New friend request'};

        if (!this.context.avatar) {
            this.context.avatar = '../images/user-logo.jpg';
        }
        this.context.party = [{avatar: this.context.avatar}, {avatar: ''}, {avatar: ''}, {avatar: ''}];


        return httpModule.doPost('/user/friends', {prefix: ''}).then(
            (response) => {
                if ('message' in response) {
                    this.context.people = [];
                } else {
                    this.context.people = response;
                }

                this.context.people.forEach((item) => {
                    if (!item.avatar) {
                        item.avatar = '../images/user-logo.jpg';
                    }
                });
            }
        );
    }

    render() {
        return this.template = require('./AuthorizedView.handlebars');
    }
}

window.goToSettings = () => {
    router.go('/settings/');
};

window.signOut = () => {
    httpModule.doPost('/signout').then(
        (response) => {
            userService.userLogout();
            router.go('/');
        }
    );
};

window.hideFriends = () => {
    const hideValue = document.querySelector('.auth-page__content-right-hide-icon-value');

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
    console.log(icon);
    router.getLastView().context.currentFriend = icon.querySelector('.friend__login-value').textContent;

    const x = icon.getBoundingClientRect().x;
    const y = icon.getBoundingClientRect().y;
    modal.style.left = `${x}px`;
    modal.style.top = `${y + icon.getBoundingClientRect().height}px`;
    modal.classList.toggle('hidden');
};

window.goToScore = () => {
    const score = document.querySelector('.leaderboard');
    if (score.classList.contains('modal-header__point_active')) {
        return;
    }
    router.go('/leaderboard/');
};

window.goToNews = () => {
    const news = document.querySelector('.news-header');
    if (news.classList.contains('modal-header__point_active')) {
        return;
    }
    router.go('/news/');
};

window.changeFriendsOrPeople = (data) => {
    router.getLastView().context.inFriends = data;
    window.search();
};

window.showInvite = (message) => {
    router.getLastView().context.request = message;
    document.querySelector('.confirm').classList.remove('hidden');
    document.querySelector('.friends-modal').classList.add('hidden');
};

const closeInvite = () => {
    document.querySelector('.confirm').classList.add('hidden');
};

window.addToFriends = () => {
    httpModule.doPost('/user/addfriend', {login: router.getLastView().context.currentFriend});
};

window.inviteToParty = () => {
    httpModule.doPost('/party/invite', {login: router.getLastView().context.currentFriend});
};

window.acceptFriend = (accept) => {
    closeInvite();
    const type = router.getLastView().context.request.type;
    accept && httpModule.doPost(`/user/${type}/response`,
        {answer: 'accept', request_id: router.getLastView().context.request.request_id}).then(
        (resolve) => {
            search();
        }
    );
};

window.play = () => {

};

window.search = () => {
    const name = document.querySelector('.search__input').value;
    const view = router.getLastView();
    const url = view.context.inFriends ? '/user/friends' : '/allusers';

    httpModule.doPost(url, {prefix: name}).then(
        (response) => {
            if ('message' in response) {
                view.context.people = [];
            } else {
                response.forEach((item) => {
                    if (!item.avatar) {
                        item.avatar = '../images/user-logo.jpg';
                    }
                });
                view.context.people = response;
                console.log(response);
            }
            router.viewUpdate('/user/', view.context);
        }
    );
};

