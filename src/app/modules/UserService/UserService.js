import httpModule from '../HttpModule/HttpModule';
import router from '../Router/Router';
import ws from '../WebSocket/WebSocket';
import bus from '../Bus/Bus';
import {WS_ADDRESS} from '../HttpModule/HttpConstants';

/**
 * Класс для работы с сессией пользователя
 * @module UserService
 */
class UserService {

    constructor() {
        this.MESSAGES = {
            ADD_AS_FRIEND: 'AskForFriendship',
            INVITE_TO_PARTY: 'InviteToParty',
            LEAVE_PARTY: 'LeaveParty',
            JOIN_GAME: 'JoinGame',
            GAME_READY: 'GameReady',
            ASK_FOR_GAME: 'AskForJoinGame',
            PARTY_VIEW: 'PartyView',
            INIT_GAME: 'InitGame',
            GAME_PREPARE: 'GamePrepare',
            FINISH_GAME: 'FinishGame',
            SERVER_SNAP: 'ServerSnap',
            CLIENT_SNAP: 'ClientSnap',
            INTERRUPT_GAME: 'InterruptGame',
        };
    }

    init() {
        this.data = {};

        return httpModule.doGet('/user').then(
            (response) => {
                this.data = response;
            },
            (reject) => {
                console.log(reject);
            }
        );
    }

    openWebSocket() {
        ws.open(
            WS_ADDRESS,
            (message) => {
                const data = JSON.parse(message.data);
                console.log(data);
                bus.emit(data.cls, message);
            },
            (message) => console.log(message)
        );
    }

    update() {
        return httpModule.doGet('/user').then(
            (response) => {
                this.data = response;
                console.log('data done');
            },
            (reject) => {
                console.log(reject);
            }
        );
    }

    /**
     * Проверка авторизации пользователя
     * @return {PromiseLike<boolean> | Promise<boolean>}
     */
    checkSession() {
        if (this.isAuthorized === undefined) {
            router.showLoading();
            return httpModule.doGet('/isauthorized').then(
                        (response) => {
                            this.isAuthorized = response.is_authorized;
                        },
                        (reject) => {
                            this.isAuthorized = false;
                        });
        } else {
            return new Promise((resolve) => resolve());
        }
    }

    /**
     * Установка флага авторизованного пользователя
     */
    userLogin() {
        this.isAuthorized = true;
    }

    /**
     * Сброс флага авторизованного пользователя
     * Удаление отрендеренных вью пользователя
     */
    userLogout() {
        ws.close(1000, 'Logout');
        this.data = {};
        this.isAuthorized = false;
        router.clearUrlElement('/user/');
        router.clearUrlElement('/leaderboard/');
        router.clearUrlElement('/settings/');
    }
}

window.userService = new UserService();
export default userService;
