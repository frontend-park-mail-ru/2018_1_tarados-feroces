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
        const response = await transport.doPost(HttpConstants.UPDATE_USER, data);
        response.ok && dispatch(update({...(await response.json()), 'isAuthorized': true }));
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
        response.ok && dispatch(signup({...(await response.json()), 'isAuthorized': true }));
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
        response.ok && dispatch(login({...(await response.json()), 'isAuthorized': true }));
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
        response.ok && dispatch(logout());
    }
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
