import {combineReducers} from 'redux';
import user from './user';
import loginForm from './loginForm';
import signupForm from './signupForm';
import settingsForm from './settingsForm';
import leaderboard from './leaderboard';

export default combineReducers(
    {
        user,
        loginForm,
        signupForm,
        settingsForm,
        leaderboard
    }
);
