import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../services/api'
import {_types, STORAGE_AUTH_USER, STORAGE_AUTH_TOKEN} from './types';
import config from '../../../config'
import * as actions from './actions';
import sha256 from 'js-sha256';

/**
 * Efetua o login do usuário.
 * @param {string} email
 * @param {string} password 
 */
export function* login({payload}: ActionType<typeof actions.login>){
    try {       
        const encryptedPassword = sha256.sha256(`${config.PASSWORD_ENCRYPT}${payload.password}`);
        const send = {password: encryptedPassword, email: payload.email };
        const { data } =  yield call(api.post, `/auth/login`, send);
        localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(data.data));
        localStorage.setItem(STORAGE_AUTH_TOKEN, data.token);
        yield put(actions.loginSuccess(data));
    }
    catch(error) {
        yield put(actions.loginFailure(error.response.data));
    }
}

/**
 * Efetua o logout do usuário atual.
 */
export function* logout(action: ActionType<typeof actions.logout>){
    try
    {        
        localStorage.removeItem(STORAGE_AUTH_USER);
        localStorage.removeItem(STORAGE_AUTH_TOKEN);
        yield put(actions.logoutSuccess());
    } 
    catch {
        yield put(actions.logoutFailure());
    }
}

/**
 * Cria um novo usuário.
 * @param {string} name
 * @param {string} email
 * @param {string} password 
 */
export function* createNewUser({payload}: ActionType<typeof actions.createNewUser>){
    try
    {        
        const encryptedPassword = sha256.sha256(`${config.PASSWORD_ENCRYPT}${payload.password}`);
        const send = {password: encryptedPassword, email: payload.email, name: payload.name };
        const { data } =  yield call(api.post, `/user`, send);
        yield put(actions.createNewUserSuccess(data));
    } 
    catch (error) {
        yield put(actions.createNewUserFailure(error.response.data));
    }
}


/**
 * Cria um novo usuário com informações aleatórias.
 */
export function* createNewRandomUser(action: ActionType<typeof actions.createNewRandomUser>){
    try
    {        
        const { data } =  yield call(api.get, `/user/factory/1`);
        yield put(actions.createNewRandomUserSuccess(data[0]));
    } 
    catch (error) {
        yield put(actions.createNewRandomUserFailure(error.response.data));
    }
}

/**
 * Todos os Sagas para o módulo Auth.
 */
export default all([
    takeLatest(_types.LOAD_LOGIN_REQUEST, login),
    takeLatest(_types.LOAD_LOGOUT_REQUEST, logout),
    takeLatest(_types.CREATE_NEW_USER_REQUEST, createNewUser),
    takeLatest(_types.CREATE_NEW_RANDOM_USER_REQUEST, createNewRandomUser),
]);