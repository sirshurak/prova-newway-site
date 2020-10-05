/**
 * Action Types
 */

import { Payload, PayloadDataState } from "../payload/types";
import * as Models from '../../../components/models';
import { User } from "../../../components/models";
import config from '../../../config'

export enum _types {
    LOAD_LOGIN_REQUEST = '@auth/login/LOAD_REQUEST',
    LOAD_LOGIN_SUCCESS = '@auth/login/LOAD_SUCCESS',
    LOAD_LOGIN_FAILURE = '@auth/login/LOAD_FAILURE',

    LOAD_LOGOUT_REQUEST = '@auth/logout/LOAD_REQUEST',
    LOAD_LOGOUT_SUCCESS = '@auth/logout/LOAD_SUCCESS',
    LOAD_LOGOUT_FAILURE = '@auth/logout/LOAD_FAILURE',

    CREATE_NEW_USER_REQUEST = '@auth/user/CREATE_NEW_USER_REQUEST',
    CREATE_NEW_USER_SUCCESS = '@auth/user/CREATE_NEW_USER_SUCCESS',
    CREATE_NEW_USER_FAILURE = '@auth/user/CREATE_NEW_USER_FAILURE',

    CREATE_NEW_RANDOM_USER_REQUEST = '@auth/new_user/CREATE_NEW_RANDOM_USER_REQUEST',
    CREATE_NEW_RANDOM_USER_SUCCESS = '@auth/new_user/CREATE_NEW_RANDOM_USER_SUCCESS',
    CREATE_NEW_RANDOM_USER_FAILURE = '@auth/new_user/CREATE_NEW_RANDOM_USER_FAILURE',
}

/**
 * Data Type
 */

 export interface Auth extends Payload, Models.Auth {

 }

 /**
  * State Type
  */

 export interface AuthState extends PayloadDataState<Auth> {
     readonly user: User;
 }

 /**
  * Key Storage
  */

 export const STORAGE_AUTH_USER = `${config.STORAGE_ALIAS_KEY}:Auth:user`;
 export const STORAGE_AUTH_TOKEN = `${config.STORAGE_ALIAS_KEY}:Auth:token`;