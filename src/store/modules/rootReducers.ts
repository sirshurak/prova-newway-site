import { combineReducers } from 'redux';
import payloads from './payload';
import products from './products';
import productDetails from './products/details';
import auth from './auth';
import home from './home';

/**
 * Combinação de todos os Reducers da aplicação.
 */
export default combineReducers({
    payloads,
    products,
    productDetails,
    auth,
    home
});