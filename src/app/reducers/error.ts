const initialState: any = {
    message: ''
};

export default function error(state: any = initialState, action: any): any {
    switch (action.type) {
        case 'SET_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
