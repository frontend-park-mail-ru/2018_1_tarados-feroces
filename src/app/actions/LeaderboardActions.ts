import transport from '../modules/Transport/Transport';
import * as HttpConstants from '../constants/HttpConstants';
import { GET_LEADERS } from '../constants/ReducersConstants';

export function getLeaderboard(position): any {
        return async (dispatch) => {
            const response = await transport.doPost(HttpConstants.GET_LEADERS, position);
            const json = await response.json();
            dispatch(
                leaderboard(
                    response.ok ? (json) : alert(json.message)
                )
            );
        }
}

export function leaderboard(leaders): any {
    return {
        type: GET_LEADERS,
        payload: leaders
    };
}