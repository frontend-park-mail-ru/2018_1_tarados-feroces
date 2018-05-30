import {GAME_OVER} from '../constants/ReducersConstants';

const initialState: any = {
    gameOver: false
};

export default function game(state: any = initialState, action: any): any {
    switch (action.type) {
        case GAME_OVER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
