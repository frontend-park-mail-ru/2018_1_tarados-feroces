import './AuthorizedView.scss';
import BaseView from '../BaseView/BaseView';

import bus from "../../modules/Bus/Bus";
import httpModule from '../../modules/HttpModule/HttpModule';
import userService from '../../modules/UserService/UserService';
import router from '../../modules/Router/Router';
import ws from '../../modules/WebSocket/WebSocket';

export default class AuthorizedView extends BaseView {

    constructor() {
        super();

        window.router = router;
        window.httpModule = httpModule;
        window.ws = ws;
        window.userService = userService;

        bus.on(userService.MESSAGES.ADD_AS_FRIEND, (message) => {
            const data = JSON.parse(message.data);
            data.message = 'New friend request';
            data.type = 'friends';
            this.context.showInvite(data);
        });
        bus.on(userService.MESSAGES.INVITE_TO_PARTY, (message) => {
            const data = JSON.parse(message.data);
            data.message = 'Invite to party';
            data.type = 'party';
            data.login = data.leader;
            this.context.showInvite(data);
        });
        bus.on(userService.MESSAGES.PARTY_VIEW, (message) => {
            const data = JSON.parse(message.data);
            window.updateParty(data);
        });
        bus.on(userService.MESSAGES.ASK_FOR_GAME, (message) => {
            this.context.showGameInvite();
        });
        bus.on(userService.MESSAGES.GAME_PREPARE, (message) => {
            this.context.playMultiplayer();
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

    setContext() {
        this.context.goToSettings = () => {
            window.router.go('/settings/');
        };

        this.context.signOut = () => {
            window.httpModule.doGet('/signout').then(
                (response) => {
                    window.userService.userLogout();
                    window.router.go('/');
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
            window.router.go('/leaderboard/');
        };

        this.context.goToNews = () => {
            const news = document.querySelector('.news-header');
            if (news.classList.contains('modal-header__point_active')) {
                return;
            }
            window.router.go('/news/');
        };

        this.context.addToFriends = () => {
            window.httpModule.doPost('/user/friend/add', {login: window.router.getLastView().context.currentFriend});
        };

        this.context.inviteToParty = () => {
            window.httpModule.doPost('/party/invite', {login: window.router.getLastView().context.currentFriend});
        };

        this.context.leaveParty = () => {
            const view = window.router.getLastView();
            view.context.party = {
                leader: {
                    avatar: this.context.avatar
                },
                users: []
            };
            window.ws.sendMessage(window.userService.MESSAGES.LEAVE_PARTY, {login: view.context.login});
            window.router.viewUpdate('/user/', view.context);
        };

        this.context.showGameInvite = () => {
            document.querySelector('.confirm-game').classList.remove('hidden');
        };

        this.context.showGameInvite = this.context.showGameInvite.bind(this);


        this.context.showInvite = (data) => {
            document.querySelector('.friends-modal').classList.add('hidden');
            const view = router.getLastView();
            view.context.request = data;
            window.router.viewUpdate('/user/', view.context);
            document.querySelector('.confirm').classList.remove('hidden');

        };

        this.context.showInvite = this.context.showInvite.bind(this);


        this.context.addToFriends = () => {
            document.querySelector('.friends-modal').classList.add('hidden');
            window.httpModule.doPost('/user/friend/add', {login: window.router.getLastView().context.currentFriend});
        };

        this.context.inviteToParty = () => {
            document.querySelector('.friends-modal').classList.add('hidden');
            window.httpModule.doPost('/party/invite', {login: window.router.getLastView().context.currentFriend});
        };

        this.context.acceptGame = () => {
            const view = window.router.getLastView();
            view.context.multiplayer = true;
            document.querySelector('.wait').classList.add('hidden');
            document.querySelector('.confirm-game-modal__message').textContent = 'Waiting for other players...';
            window.ws.sendMessage(window.userService.MESSAGES.JOIN_GAME, {login: view.context.login});
        };

        this.context.startGame = () => {
            const view = window.router.getLastView();
            window.httpModule.doPost('/game/party', {leader: view.context.party.leader.login});
        };

        this.context.playMultiplayer = () => {
            document.querySelector('.confirm-game').classList.add('hidden');
            window.router.go('/multi/');
        };

        this.context.playSingleplayer = () => {
            window.router.go('/single/');
        };

    }

    preRender() {
        userService.openWebSocket();
        console.log(userService.data);
        this.context = userService.data;
        this.context.inFriends = true;

        if (!this.context.avatar) {
            this.context.avatar = '../images/user-logo.jpg';
        }

        this.context.waiting = false;

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

                    item.online = item.online ? 'yes' : '';
                });

                console.log(this.context.people);

                return httpModule.doGet('/party/get').then(
                    (response) => {
                        this.context.party = response;

                        if (!this.context.party.leader.avatar) {
                            this.context.party.leader.avatar = '../images/user-logo.jpg';
                        }

                        this.context.party.users.forEach((item) => {
                            if (!item.avatar) {
                                item.avatar = '../images/user-logo.jpg';
                            }
                        });
                    },
                    (reject) => {
                        this.context.party = {
                            leader: {
                                avatar: this.context.avatar
                            },
                            users: []
                        };
                    }
                );
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
    closeInvite();
    const view = router.getLastView();
    const type = view.context.request.type;

    let url = '/party/join';
    let response = {answer: 'accept', leader: view.context.request.leader};
    if (type === 'friends') {
        url = '/user/friend/response';
        response = {answer: 'accept', request_id: view.context.request.request_id};
    }

    accept && httpModule.doPost(url, response).then(
        (resolve) => {
            search();
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
                    item.online = item.online ? 'yes' : '';
                });
                view.context.people = response;
                console.log(response);
            }
            router.viewUpdate('/user/', view.context);
        }
    );
};

window.acceptFriend = (accept) => {
    document.querySelector('.confirm').classList.add('hidden');
    const view = window.router.getLastView();
    const type = view.context.request.type;

    let url = '/party/join';
    let response = {answer: 'accept', leader: view.context.request.leader};
    if (type === 'friends') {
        url = '/user/friend/response';
        response = {answer: 'accept', request_id: view.context.request.request_id};
    }

    accept && window.httpModule.doPost(url, response).then(
        (resolve) => {
            search();
        }
    );
};

window.updateParty = (data) => {
    const view = window.router.getLastView();
    view.context.party = data;
    window.router.viewUpdate('/user/', view.context);
};
