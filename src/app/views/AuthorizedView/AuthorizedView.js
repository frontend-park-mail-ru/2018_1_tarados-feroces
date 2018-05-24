import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';
// import httpModule from '../../modules/HttpModule/HttpModule';
// import userService from '../../modules/UserService/UserService';
// import router from '../../modules/Router/Router';
// import ws from '../../modules/WebSocket/WebSocket';
// import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';

export default class AuthorizedView extends BaseView {

    update(context = {}) {
        this.context = context;
    }

    setContext() {
        this.context.goToSettings = () => {
            router.go('/settings/');
        };

        this.context.signOut = () => {
            httpModule.doPost('/signout').then(
                (response) => {
                    userService.userLogout();
                    router.go('/');
                }
            );
        };

        this.context.hideFriends = () => {
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

        this.context.goToScore = () => {
            const score = document.querySelector('.leaderboard');
            if (score.classList.contains('modal-header__point_active')) {
                return;
            }
            router.go('/leaderboard/');
        };

        this.context.goToNews = () => {
            const news = document.querySelector('.news-header');
            if (news.classList.contains('modal-header__point_active')) {
                return;
            }
            router.go('/news/');
        };



        this.context.showInvite = (message) => {
            router.getLastView().context.request = message;
            document.querySelector('.confirm').classList.remove('hidden');
            document.querySelector('.friends-modal').classList.add('hidden');
        };

        const closeInvite = () => {
            document.querySelector('.confirm').classList.add('hidden');
        };

        this.context.addToFriends = () => {
            httpModule.doPost('/user/friend/add', {login: router.getLastView().context.currentFriend});
        };

        this.context.inviteToParty = () => {
            httpModule.doPost('/party/invite', {login: router.getLastView().context.currentFriend});
        };

        this.context.play = () => {

        };

        this.context.search = () => {
            const name = document.querySelector('.search__input').value;
            const view = router.getLastView();
            const url = view.context.inFriends ? '/user/friend/all' : '/allusers';

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


        return httpModule.doPost('/user/friend/all', {prefix: ''}).then(
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

window.changeFriendsOrPeople = (data) => {
    router.getLastView().context.inFriends = data;
    window.search();
};

window.acceptFriend = (accept) => {
    const view = router.getLastView();
    view.context.closeInvite();
    const type = view.context.request.type;
    const url = type === 'friend' ? '/user/friend/response' : 'party/response';
    accept && httpModule.doPost(url,
        {answer: 'accept', request_id: router.getLastView().context.request.request_id}).then(
        (resolve) => {
            view.context.search();
        }
    );
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

