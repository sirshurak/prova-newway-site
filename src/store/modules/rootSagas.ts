import { all, takeLatest } from 'redux-saga/effects';
import products from './products/sagas';
import auth from './auth/sagas';
import productDetails from './products/details/sagas';
import home from './home/sagas';

/**
 * Combinação de todos os Sagas da aplicação.
 */
export default function* loadSagas(){
    return yield all([
        products,
        productDetails,
        auth,
        home        
    ]);
}