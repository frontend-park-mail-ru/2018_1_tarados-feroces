const initialState: any = {
    isAuthorized: null
};

export default function user(state: any = initialState, action: any): any {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}