import { action } from 'typesafe-actions';
import { Product, _types } from './types';

export const loadProductsRequest = (offset: number, limit: number) => action(_types.LOAD_PRODUCTS_REQUEST, {offset, limit});

export const loadProductsSuccess = (data: Product[]) => action(_types.LOAD_PRODUCTS_SUCCESS, { data });

export const loadProductsFailure = () => action(_types.LOAD_PRODUCTS_FAILURE);