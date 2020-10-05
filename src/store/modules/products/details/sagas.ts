import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../../services/api';
import * as actions from './actions';
import {_types} from './types';

export function* loadProductDetail({payload}: ActionType<typeof actions.loadProductRequest>){
    try {        
        const { data } =  yield call(api.get, `/product/${payload.id}`);
        yield put(actions.loadProductSuccess(data));
    }
    catch(error){
        yield put(actions.loadProductFailure(error.response.data));
    }
}

export function* sendProductAvaliation({payload}: ActionType<typeof actions.sendProductAvaliationRequest>){
    try {        
        console.log(payload);
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

export default all([
    takeLatest(_types.LOAD_PRODUCT_REQUEST, loadProductDetail),
    takeLatest(_types.SEND_PRODUCT_AVALATION_REQUEST, sendProductAvaliation),
]);