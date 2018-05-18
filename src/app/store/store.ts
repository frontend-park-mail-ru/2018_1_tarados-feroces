import {createStore} from 'redux';
import rootReducer from '../reducers/user';

export default function configureStore(initialState: any): any {
    const store: any = createStore(
        rootReducer,
        initialState
    );
    return store;
}
