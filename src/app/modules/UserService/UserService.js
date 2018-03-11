(function() {
    'use strict';

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
            return httpModule.doGet('/me').then(
                (response) => this.isAuthorized = true,
                (reject) => this.isAuthorized = false);
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
            router.urls['/user/'].view.deleteElement();
            router.urls['/user/'].loaded = false;
            if (router.urls['/settings/'].loaded) {
                router.urls['/settings/'].view.deleteElement();
                router.urls['/settings/'].loaded = false;
            }
        }
    }

    window.userService = new UserService();
})();
