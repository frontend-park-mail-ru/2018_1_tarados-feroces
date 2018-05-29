import { GET_LEADERS } from '../constants/ReducersConstants';

const initialState: any = {
};

export default function leaderboard(state: any = initialState, action: any): any {
    switch (action.type) {
        case GET_LEADERS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
