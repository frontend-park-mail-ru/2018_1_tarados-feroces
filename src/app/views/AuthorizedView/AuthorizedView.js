import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import userService from '../../modules/UserService/UserService';
import router from '../../modules/Router/Router';
import Ws from '../../modules/WebSocket/WebSocket';
import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';

export default class AuthorizedView extends BaseView {

    update(context = {}) {

        this.context = context;
        // console.log(context);
    }

    preRender() {
        console.log(userService.data);
        this.context = userService.data;
        this.context.inFriends = true;

        if (!this.context.avatar) {
            this.context.avatar = '../images/user-logo.jpg';
        }

        return httpModule.doPost('/user/friends', {prefix: ''}).then(
            (response) => {
                // console.log(response);
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
    // console.log(modal);
    console.log(icon);
    router.getLastView().context.currentFriend = icon.querySelector('.friend__login-value').textContent;

    const x = icon.getBoundingClientRect().x;
    const y = icon.getBoundingClientRect().y;
    // console.log(icon.left);
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

window.inviteToParty = () => {
    console.log(router.getLastView().context.currentFriend);
    // const ws1 = new Ws(
    //     WS_ADDRESS,
    //     (message) => console.log(message),
    //     (message) => console.log(message)
    // );
    // ws1.sendMessage(JSON.stringify({cls: 'aaf', message: 'Sanya hello!'}));
};

window.changeFriendsOrPeople = () => {
    if (router.getLastView().context.inFriends) {
        router.getLastView().context.inFriends = false;
    } else {
        router.getLastView().context.inFriends = true;
    }
    window.search();
};

window.addToFriends = () => {
    console.log(router.getLastView().context.currentFriend);
};

window.play = () => {
    const ws1 = new Ws(
        WS_ADDRESS,
        (message) => console.log(message),
        (message) => console.log(message)
    );
    ws1.sendMessage(JSON.stringify({cls: 'aaf', message: 'Sanya hello!'}));
};

window.search = () => {
    const name = document.querySelector('.search__input').value;
    console.log(name);
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
            // console.log(view.context);
            router.viewUpdate('/user/', view.context);
        }
    );


};

