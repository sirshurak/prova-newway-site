import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../services/api'
import {_types} from './types';
import { loadProductsSuccess, loadProductsFailure, loadProductsRequest } from './actions';

export function* loadProducts({payload}: ActionType<typeof loadProductsRequest>){
    try {        
        const { data } =  yield call(api.get, `/product?limit=${payload.limit}&offset=${payload.offset}`);
        console.log(data);
        yield put(loadProductsSuccess(data));
    }
    catch(error){
        yield put(loadProductsFailure());
    }
}

export default all([
    takeLatest(_types.LOAD_PRODUCTS_REQUEST, loadProducts),
]);