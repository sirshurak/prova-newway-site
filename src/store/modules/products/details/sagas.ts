import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../../services/api';
import { STORAGE_AUTH_USER } from '../../auth/types';
import * as actions from './actions';
import {_types} from './types';

/**
 * Busca um produto na API.
 * @param {number} id id do produto à ser buscado na API.
 */
export function* loadProductDetail({payload}: ActionType<typeof actions.loadProductRequest>){
    try {        
        const { data } =  yield call(api.get, `/product/${payload.id}`);
        yield put(actions.loadProductSuccess(data));
    }
    catch(error){
        yield put(actions.loadProductFailure(error.response.data));
    }
}

/**
 * Envia uma avaliação de Produto para API.
 * @param {User} user dados do usuário.
 * @param {string} userToken token do usuário. 
 * @param {number} productId id do Produto.
 * @param {number} rate
 * @param {string} description
 */
export function* sendProductAvaliation({payload}: ActionType<typeof actions.sendProductAvaliationRequest>){
    try {   
        let userToken = payload.userToken;    
        if (userToken === "") 
            userToken = localStorage.getItem(STORAGE_AUTH_USER) ?? "";
        const { data } =  yield call(api.post, 
            `/product/avaliation/${payload.productId}`, 
            { userId: payload.user.id, userName: payload.user.name, rate: payload.rate, description: payload.description },
            { 
                headers: { Authorization: `Bearer ${payload.userToken}` }
            });
        yield put(actions.sendProductAvaliationSuccess());
    }
    catch(error){
        yield put(actions.sendProductAvaliationFailure(error.response.data));
    }
}

/**
 * Todos os Sagas para o módulo Product Details.
 */
export default all([
    takeLatest(_types.LOAD_PRODUCT_REQUEST, loadProductDetail),
    takeLatest(_types.SEND_PRODUCT_AVALATION_REQUEST, sendProductAvaliation),
]);