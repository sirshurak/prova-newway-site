import { all, takeLatest } from 'redux-saga/effects';
import products from './products/sagas';
import productDetails from './products/details/sagas';

export default function* loadSagas(){
    return yield all([
        products,
        productDetails        
    ]);
}