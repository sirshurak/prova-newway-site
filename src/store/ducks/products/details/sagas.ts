import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import {_types} from './types';

export function* loadProduct(){
    
}

export default all([
    takeLatest(_types.LOAD_PRODUCT_REQUEST, loadProduct),
]);