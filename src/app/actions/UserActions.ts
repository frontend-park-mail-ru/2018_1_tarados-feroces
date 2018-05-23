import transport from '../modules/Transport/Transport';
import * as HttpConstants from '../constants/HttpConstants';
import { SET_USER, LOGIN_USER, SIGNUP_USER, LOGOUT_USER, UPDATE_USER } from '../constants/ReducersConstants';


export function setUser(user): any {
    return {
        type: SET_USER,
        payload: user
    };
}

export function getUser() {
    return async (dispatch) => {
        const response = await transport.doGet(HttpConstants.GET_USER);
        dispatch(
            setUser(
            response.ok ? ( {...(await response.json()), 'isAuthorized': true } ) : { 'isAuthorized': false }
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
        // response.ok && dispatch(update(await response.json()));
    }
}

function update(data): any {
    return {
        type: UPDATE_USER,
        payload: data
    };
}

export function signupUser(data) {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.SIGNUP, data);
        const json = await response.json();
        response.ok ? dispatch(signup({...json, 'isAuthorized': true })) : alert(json.message);
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
        response.ok ? dispatch(signup({...json, 'isAuthorized': true })) : alert(json.message);
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
        response.ok ? dispatch(logout()) : alert(json.message);    }
}

function logout(): any {
    return {
        type: LOGOUT_USER,
        payload: { isAuthorized: false }
    };
}

// export async function req(): any {
//         return transport.doPost('/signout');
// }
//
// async function test() {
//     const reponse = await req();
// }
