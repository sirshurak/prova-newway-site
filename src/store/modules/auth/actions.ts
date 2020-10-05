import { action } from 'typesafe-actions';
import { User } from '../../../components/models/user';
import { Auth, _types } from './types';

export const login = (email: string, password: string) => action(_types.LOAD_LOGIN_REQUEST, {email, password});

export const loginSuccess = (data: Auth) => action(_types.LOAD_LOGIN_SUCCESS, { data });

export const loginFailure = (data: any) => action(_types.LOAD_LOGIN_FAILURE, {data});

export const logout = () => action(_types.LOAD_LOGOUT_REQUEST);

export const logoutSuccess = () => action(_types.LOAD_LOGOUT_SUCCESS);

export const logoutFailure = () => action(_types.LOAD_LOGOUT_FAILURE);

export const createNewUser = (name:string, email: string, password: string) => action(_types.CREATE_NEW_USER_REQUEST, { name, email, password});

export const createNewUserSuccess = (data: User) => action(_types.CREATE_NEW_USER_SUCCESS, { data });

export const createNewUserFailure = (data: any) => action(_types.CREATE_NEW_USER_FAILURE, { data });

export const createNewRandomUser = () => action(_types.CREATE_NEW_RANDOM_USER_REQUEST);

export const createNewRandomUserSuccess = (data: User) => action(_types.CREATE_NEW_RANDOM_USER_SUCCESS, { data });

export const createNewRandomUserFailure = (data: any) => action(_types.CREATE_NEW_RANDOM_USER_FAILURE, { data });
