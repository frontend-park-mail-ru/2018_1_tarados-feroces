import httpModule from '../HttpModule/HttpModule'
import router from '../Router/Router'

/**
 * Класс для работы с сессией пользователя
 * @module UserService
 */
class UserService {

    /**
     * Проверка авторизации пользователя
     * @return {PromiseLike<boolean> | Promise<boolean>}
     */
    checkSession() {
        return httpModule.doGet('/isauthorized').then(
            (response) => {
                this.isAuthorized = response.is_authorized;
            });
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
        this.isAuthorized = false;
        router.clearUrlElement('/user/');
        router.clearUrlElement('/leaderboard/');
        router.clearUrlElement('/settings/');
    }
}

const userService = new UserService();
export default userService;
