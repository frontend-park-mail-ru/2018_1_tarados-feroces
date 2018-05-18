import transport from '../modules/Transport/Transport';

/**
 * Класс для работы с сессией пользователя
 * @module UserService
 */
class UserService {

    public isAuthorized;

    /**
     * Проверка авторизации пользователя
     * @return {PromiseLike<boolean> | Promise<boolean>}
     */
    public checkSession(): any {
        if (this.isAuthorized === undefined) {
            return transport.doGet('/isauthorized').then(
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
    public userLogin(): void {
        this.isAuthorized = true;
    }

    /**
     * Сброс флага авторизованного пользователя
     * Удаление отрендеренных вью пользователя
     */
    public userLogout(): void {
        this.isAuthorized = false;
    }
}

const userService: any = new UserService();
export default userService;
