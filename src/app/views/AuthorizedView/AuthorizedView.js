import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import userService from '../../modules/UserService/UserService';
import router from '../../modules/Router/Router';
import ws from '../../modules/WebSocket/WebSocket';
import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';
import bus from "../../modules/Bus/Bus";

export default class AuthorizedView extends BaseView {

    constructor() {
        super();
        bus.on(userService.MESSAGES.ADD_AS_FRIEND, (message) => {
            const data = JSON.parse(message.data);
            data.message = 'New friend request';
            data.type = 'friends';
            showInvite(data);
        });
        bus.on(userService.MESSAGES.INVITE_TO_PARTY, (message) => {
            const data = JSON.parse(message.data);
            data.message = 'Invite to party';
            data.type = 'party';
            data.login = data.leader;
            showInvite(data);
        });
        bus.on(userService.MESSAGES.PARTY_VIEW, (message) => {
            const data = JSON.parse(message.data);
            updateParty(data);
            showInvite(data);
        });
    }

    update(context = {}) {

        this.context = context;
        if (this.context.request && !this.context.request.avatar) {
            this.context.request.avatar = '../images/user-logo.jpg';
        }
        if (this.context.party.users.length) {
            this.context.party.users.forEach((item) => {
                if (!item.avatar) {
                    item.avatar = '../images/user-logo.jpg';
                }
            });
        }
        if (!this.context.party.leader.avatar) {
            this.context.party.leader.avatar = '../images/user-logo.jpg';
        }
    }

    preRender() {
        userService.openWebSocket();
        console.log(userService.data);
        this.context = userService.data;
        this.context.inFriends = true;

        if (!this.context.avatar) {
            this.context.avatar = '../images/user-logo.jpg';
        }

        this.context.party = {
            leader: {
                avatar: this.context.avatar
            },
            users: [{avatar: '../images/transparent.ico'}]
        };

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

window.goToSettings = () => {
    router.go('/settings/');
};

window.signOut = () => {
    httpModule.doGet('/signout').then(
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

window.changeFriendsOrPeople = (data) => {
    router.getLastView().context.inFriends = data;
    window.search();
};

const closeModal = () => {
    document.querySelector('.friends-modal').classList.add('hidden');
};

window.showInvite = (data) => {
    closeModal();
    const view = router.getLastView();
    view.context.request = data;
    router.viewUpdate('/user/', view.context);
    document.querySelector('.confirm').classList.remove('hidden');

};

const closeInvite = () => {
    document.querySelector('.confirm').classList.add('hidden');
};

window.addToFriends = () => {
    closeModal();
    httpModule.doPost('/user/friend/add', {login: router.getLastView().context.currentFriend});
};

window.inviteToParty = () => {
    closeModal();
    httpModule.doPost('/party/invite', {login: router.getLastView().context.currentFriend});
};

window.updateParty = (data) => {
    const view = router.getLastView();
    view.context.party = data;
    router.viewUpdate('/user/', view.context);
};

window.acceptFriend = (accept) => {
    closeInvite();
    const type = router.getLastView().context.request.type;

    let url = '/party/response';
    let response = {answer: 'accept', leader: router.getLastView().context.request.leader};
    if (type === 'friends') {
        url = '/user/friend/response';
        response = {answer: 'accept', request_id: router.getLastView().context.request.request_id};
    }

    accept && httpModule.doPost(url, response).then(
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

