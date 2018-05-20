import {combineReducers} from 'redux';
import user from './user';
import loginForm from './loginForm';
import signupForm from './signupForm';

export default combineReducers(
    {
        user,
        loginForm,
        signupForm,
    }
);
