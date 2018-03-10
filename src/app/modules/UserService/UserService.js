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
        }
    }

    window.userService = new UserService();
})();
