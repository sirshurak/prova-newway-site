import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './modules/rootReducers';
import sagas from './modules/rootSagas';
 
export interface ApplicationState<P = {}> {
    payloads: P
}

const sagaMiddlware = createSagaMiddleware();

/**
 * Store com os reducers, sagas e middleware da aplicação.
 */
const store: Store<ApplicationState> = createStore(reducers, applyMiddleware(sagaMiddlware));

sagaMiddlware.run(sagas);


export default store;