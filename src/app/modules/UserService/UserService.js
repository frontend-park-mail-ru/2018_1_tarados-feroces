(function() {
    'use strict';

    class UserService {

        checkSession() {
            return httpModule.doGet('/me').then(
                (response) => this.isAuthorized = true,
                (reject) => this.isAuthorized = false);
        }

        userLogin() {
            this.isAuthorized = true;
        }

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
