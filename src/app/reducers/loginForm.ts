import { SET_LOGIN_FORM } from '../constants/ReducersConstants';

const initialState: any = {
    login: '',
    password: ''
};

export default function loginForm(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_LOGIN_FORM:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}