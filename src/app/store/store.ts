import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState: any): any {
    const store: any = createStore(
        rootReducer,
        initialState
    );
    return store;
}
