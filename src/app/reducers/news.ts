import { GET_NEWS } from '../constants/ReducersConstants';

const initialState: any = {
};

export default function news(state: any = initialState, action: any): any {
    switch (action.type) {
        case GET_NEWS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
