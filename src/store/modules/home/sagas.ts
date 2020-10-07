import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType, action } from 'typesafe-actions';
import api from '../../../services/api'
import {_types} from './types';
import * as actions from './actions';

/**
 * Carrega as informações necessárias da API.
 */
export function* load(){
    try {     
        let response1 = yield call(api.get, `/product/count`);
        let response2 = yield call(api.get, `/user/count`);
        const countProduct = response1.data;
        const countUser = response2.data;
        yield put(actions.loadSuccess({ countProduct, countUser}));
    }
    catch(error) {
        yield put(actions.loadFailure(error.response.data));
    }
}

/**
 * Utiliza a API de factory.
 * @param {(user|product)} name nome da API à utilizar o factory.
 * @param {number} qty quantidade de registros à serem criados.  
 */
export function* factory({payload}: ActionType<typeof actions.factory>){
    try {       
        const { data } = yield call(api.get, `/${payload.name}/factory/${payload.qty}`);
        yield put(actions.factorySuccess(data));
    }
    catch(error) {
        yield put(actions.factoryFailure(error.response.data));
    }
}

/**
 * Todos os Sagas para o módulo Home.
 */
export default all([
    takeLatest(_types.LOAD_HOME_REQUEST, load),
    takeLatest(_types.FACTORY_REQUEST, factory),
]);