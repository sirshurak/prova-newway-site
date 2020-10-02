import { action } from 'typesafe-actions';
import { Product, _types } from './types';

export const loadProductRequest = (id: number) => action(_types.LOAD_PRODUCT_REQUEST, { id });

export const loadProductSuccess = (data: Product) => action(_types.LOAD_PRODUCT_SUCCESS, { data });

export const loadProductFailure = () => action(_types.LOAD_PRODUCT_FAILURE);