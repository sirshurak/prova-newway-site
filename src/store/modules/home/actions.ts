import { action } from 'typesafe-actions';
import { _types } from './types';

export const load = () => action(_types.LOAD_HOME_REQUEST);

export const loadSuccess = (data: any) => action(_types.LOAD_HOME_SUCCESS, { data });

export const loadFailure = (data: any) => action(_types.LOAD_HOME_FAILURE, {data});