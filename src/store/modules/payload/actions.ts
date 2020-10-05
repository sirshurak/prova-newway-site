import { action } from 'typesafe-actions';
import { Payload, _types } from './types';

export const loadRequest = () => action(_types.LOAD_REQUEST);

export const loadSuccess = (data: Payload[]) => action(_types.LOAD_SUCCESS, { data });

export const loadFailure = () => action(_types.LOAD_FAILURE);





