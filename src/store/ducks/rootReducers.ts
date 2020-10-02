import { combineReducers } from 'redux';
import payloads from './payload';
import products from './products';
import productDetails from './products/details';

export default combineReducers({
    payloads,
    products,
    productDetails
});