const initialState: any = {
    user: {
        isAuthorized: null
    }
};

export default function user(state: any = initialState, action: any): any {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
}