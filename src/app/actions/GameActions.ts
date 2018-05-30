import {GAME_OVER} from '../constants/ReducersConstants';

export function gameOver(): any {
    return {
        type: GAME_OVER,
        payload: {gameOver: true}
    };
}