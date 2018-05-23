import transport from '../modules/Transport/Transport';
import * as HttpConstants from '../constants/HttpConstants';
import { GET_NEWS } from '../constants/ReducersConstants';

export function getNews(position): any {
    return async (dispatch) => {
        const response = await transport.doPost(HttpConstants.GET_NEWS, position);
        const json = await response.json();
        dispatch(
            news(
                response.ok ? (json) : alert(json.message)
            )
        );
    }
}

export function news(leaders): any {
    return {
        type: GET_NEWS,
        payload: leaders
    };
}