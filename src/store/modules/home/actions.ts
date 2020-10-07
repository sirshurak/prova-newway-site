import { action } from 'typesafe-actions';
import { _types } from './types';

export const load = () => action(_types.LOAD_HOME_REQUEST);

export const loadSuccess = (data: any) => action(_types.LOAD_HOME_SUCCESS, { data });

export const loadFailure = (data: any) => action(_types.LOAD_HOME_FAILURE, {data});

export const factory = (name: string, qty: number) => action(_types.FACTORY_REQUEST, { name, qty });

export const factorySuccess = (data: any) => action(_types.FACTORY_SUCCESS, { data });

export const factoryFailure = (data: any) => action(_types.FACTORY_FAILURE, { data });