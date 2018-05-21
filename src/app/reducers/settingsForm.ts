const initialState: any = {};

export default function settingsForm(state: any = initialState, action: any): any {
    switch (action.type) {
        case 'SET_SETTINGS_FORM':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}