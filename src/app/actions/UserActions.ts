import transport from '../modules/Transport/Transport';
import * as HttpConstants from '../constants/HttpConstants';
import {
    SET_USER, LOGIN_USER, SIGNUP_USER, LOGOUT_USER, UPDATE_USER, GET_FRIENDS,
    GET_PEOPLE, SET_PEOPLE_LOADING, GET_PARTY
} from '../constants/ReducersConstants';

import ws from '../modules/WebSocket/WebSocket';

import { setSettingsForm } from './SettingsActions';
import { setError } from './ErrorActions';


export function setUser(user): any {
    return {
        type: SET_USER,
        payload: user
    };
}

export function getUser() {
    return async (dispatch) => {
        dispatch(setUser({'isAuthorized': null}));
        const response = await transport.doGet(HttpConstants.GET_USER);
        if (response.ok && !ws.address) {
            ws.open();
        }
        const json = await response.json();
        response.ok && dispatch(setSettingsForm({
            login: json.login,
            email: json.email
        }));
        dispatch(
            setUser(
            response.ok ? ( {...json, 'isAuthorized': true } ) : { 'isAuthorized': false }
            )
        );
    }
}

export function updateUser(data) {
    return async (dispatch) => {
        dispatch(setUser( { isAuthorized : null } ));
        const response = await transport.doPost(HttpConstants.UPDATE_USER, data);
        const json = await response.json();
        response.ok ? dispatch(getUser()) : alert(json.message);
    }
}

export function sendFriendsInvite(data) {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.SEND_FRIENDS_INVITE, data);
        const json = await response.json();
        !response.ok && dispatch(setError({ ...json }));
    };
}

export function sendPartyInvite(data) {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.SEND_PARTY_INVITE, data);
        const json = await response.json();
        !response.ok && dispatch(setError({ ...json }));
    };
}

function update(data): any {
    return {
        type: UPDATE_USER,
        payload: data
    };
}

export function signupUser(data) {
    return async (dispatch) => {
        data['avatar'] = '../static/imgs/user-logo.jpg';
        const response = await transport.doPost(HttpConstants.SIGNUP, data);
        const json = await response.json();
        response.ok ?
            dispatch(signup({...json, 'isAuthorized': true })) :
            dispatch(setError({ ...json }));
    }
}

function signup(data): any {
    return {
        type: SIGNUP_USER,
        payload: data
    };
}

export function loginUser(data) {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.LOGIN, data);
        const json = await response.json();
        response.ok ?
            dispatch(login({...json, 'isAuthorized': true })) :
            dispatch(setError({ ...json }));
    }
}

function login(data): any {
    return {
        type: LOGIN_USER,
        payload: data
    };
}

export function logoutUser() {
    return async (dispatch) => {
        const response = await transport.doGet(HttpConstants.LOGOUT);
        const json = await response.json();
        response.ok ? dispatch(logout()) : dispatch(setError({...json}));
    }
}

function logout(): any {
    return {
        type: LOGOUT_USER,
        payload: { isAuthorized: false }
    };
}

export function getFriends(prefix = ''): any {
    return async (dispatch) => {
        dispatch(setPeopleLoading(true));
        const response = await transport.doPost(HttpConstants.GET_FRIENDS, { prefix });
        let json = await response.json();
        if (json.message) {
            json = [];
        }
        response.ok ? dispatch(friends(json)) : dispatch(setError({ ...json }));
        dispatch(setPeopleLoading(false));
    }
}

function friends(people): any {
    return {
        type: GET_FRIENDS,
        payload: {friends: people}
    };
}

export function getPeople(prefix = ''): any {
    return async (dispatch) => {
        dispatch(setPeopleLoading(true));
        const response = await transport.doPost(HttpConstants.GET_PEOPLE, { prefix });
        const json = await response.json();
        response.ok ? dispatch(people(json)) : dispatch(setError({ ...json }));
        dispatch(setPeopleLoading(false));
    }
}

function people(people): any {
    return {
        type: GET_PEOPLE,
        payload: {people: people}
    };
}

function setPeopleLoading(state) {
    return {
        type: SET_PEOPLE_LOADING,
        payload: {peopleLoading: state}
    }
}

export function getParty(): any {
    console.log('GET PARTY');
    return async (dispatch) => {
        const response = await transport.doGet(HttpConstants.GET_PARTY);
        const json = await response.json();
        response.ok ? dispatch(party(json)) : dispatch(party(false));
    }
}

export function setParty(data): any {
    return (dispatch) => {
        dispatch(party(data));
    }
}

function party(party): any {
    return {
        type: GET_PARTY,
        payload: {party: party}
    };
}

export function acceptParty(leader) {
    console.log('GET PARTY');
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.ACCEPT_PARTY_INVITE, {leader, answer: 'accept'});
        const json = await response.json();
        response.ok ? dispatch(getParty()) : dispatch(setError({ ...json }));
    }
}

export function acceptFriends(request_id) {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.ACCEPT_FRIENDS_INVITE, {request_id, answer: 'accept'});
        const json = await response.json();
        response.ok ? dispatch(getFriends()) : dispatch(setError({ ...json }));
    }
}

export function startGame(leader) {
    return async (dispatch) => {
        await transport.doPost(HttpConstants.START_GAME, {leader: leader});
    }
}
