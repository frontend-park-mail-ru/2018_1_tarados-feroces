import { SET_SIGNUP_FORM } from '../constants/ReducersConstants';

const initialState: any = {};

export default function signupForm(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_SIGNUP_FORM:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}