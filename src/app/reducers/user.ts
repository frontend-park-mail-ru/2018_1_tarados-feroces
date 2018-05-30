import {
    SET_USER, LOGIN_USER, SIGNUP_USER, LOGOUT_USER, UPDATE_USER, GET_FRIENDS,
    GET_PEOPLE, SET_PEOPLE_LOADING, GET_PARTY
} from '../constants/ReducersConstants';

const initialState: any = {
    isAuthorized: null,
    email: '',
    login: '',
    peopleLoading: true,
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
        case GET_FRIENDS:
            return { ...state, ...action.payload };
        case GET_PEOPLE:
            return { ...state, ...action.payload };
        case SET_PEOPLE_LOADING:
            return { ...state, ...action.payload };
        case GET_PARTY:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
