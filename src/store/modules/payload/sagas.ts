import { call, put } from 'redux-saga/effects';
import api from '../../../services/api'
import { loadSuccess, loadFailure } from './actions';

export function* _load(){
    try {
        const response =  yield call(api.get, '');
        yield put(loadSuccess(response.data));
    }
    catch(error){
        yield put(loadFailure());
    }
}