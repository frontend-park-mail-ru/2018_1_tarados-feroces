import {SET_SCORE} from '../constants/ReducersConstants';

const initialState: any = {
};

export default function game(state: any = initialState, action: any): any {
    switch (action.type) {
        case SET_SCORE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
