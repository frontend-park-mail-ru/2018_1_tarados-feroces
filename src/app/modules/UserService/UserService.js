import httpModule from '../HttpModule/HttpModule';
import router from '../Router/Router';
import ws from '../WebSocket/WebSocket';
import {WS_ADDRESS} from '../HttpModule/HttpConstants';

/**
 * Класс для работы с сессией пользователя
 * @module UserService
 */
class UserService {

    init() {
        this.data = {};
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

    openWebSocket() {
        ws.open(
            WS_ADDRESS,
            (message) => {
                const data = JSON.parse(message.data);
                switch (data.cls) {
                    case 'ping':
                        showInvite(data);
                        break;
                    case 'atp':
                        showInvite(data);
                        break;
                    default:
                        console.log(data);
                }
                console.log(message);
            },
            (message) => console.log(message)
        );
    }

    update(data) {
        this.data = data;
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

const userService = new UserService();
export default userService;
