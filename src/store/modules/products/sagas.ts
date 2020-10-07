import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../services/api'
import {_types} from './types';
import * as actions from './actions';

/**
 * Busca produtos na API.
 * @param limit quantidade de registros.
 * @param offset registros à serem ignorados.
 */
export function* loadProducts({payload}: ActionType<typeof actions.loadProductsRequest>){
    try {      
        const { data } =  yield call(api.get, `/product?limit=${payload.limit}&offset=${payload.offset}`);
        yield put(actions.loadProductsSuccess(data));
    }
    catch(error){
        yield put(actions.loadProductsFailure());
    }
}

/**
 * Todos os Sagas para o módulo Products.
 */
export default all([
    takeLatest(_types.LOAD_PRODUCTS_REQUEST, loadProducts),
]);