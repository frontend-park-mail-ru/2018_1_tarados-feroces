import { SET_SETTINGS_FORM } from '../constants/ReducersConstants';

const initialState: any = {
    login: '',
    email: ''
};

export default function settingsForm(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_SETTINGS_FORM:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}