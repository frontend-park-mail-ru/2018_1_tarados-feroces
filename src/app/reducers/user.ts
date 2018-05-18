const initialState: any = {
    user: {}
};

export default function user(state: any = initialState, action: any) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
}