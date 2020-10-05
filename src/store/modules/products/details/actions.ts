import { action } from 'typesafe-actions';
import { User } from '../../../../components/models';
import { Product, _types } from './types';

export const loadProductRequest = (id: number) => action(_types.LOAD_PRODUCT_REQUEST, { id });

export const loadProductSuccess = (data: Product) => action(_types.LOAD_PRODUCT_SUCCESS, { data });

export const loadProductFailure = (data: any) => action(_types.LOAD_PRODUCT_FAILURE, {data});

export const sendProductAvaliationRequest = (productId: number, rate: number, description: string, userToken: string, user: User) => action(_types.SEND_PRODUCT_AVALATION_REQUEST, { productId, rate, description, userToken, user });

export const sendProductAvaliationSuccess = () => action(_types.SEND_PRODUCT_AVALATION_SUCCESS);

export const sendProductAvaliationFailure = (data: any) => action(_types.LOAD_PRODUCT_FAILURE, {data});