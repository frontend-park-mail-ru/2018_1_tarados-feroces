import { SET_USER, LOGIN_USER, SIGNUP_USER, LOGOUT_USER, UPDATE_USER } from '../constants/ReducersConstants';

const initialState: any = {
    isAuthorized: null,
    email: '',
    login: ''
};

export default function user(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload };
        case SIGNUP_USER:
            return { ...state, ...action.payload };
        case LOGIN_USER:
            return { ...state, ...action.payload };
        case LOGOUT_USER:
            return { ...state, ...action.payload };
        case UPDATE_USER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
