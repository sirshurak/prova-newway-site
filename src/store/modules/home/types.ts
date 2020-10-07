/**
 * Action Types
 */

import { Payload, PayloadDataState } from "../payload/types";

export enum _types {
    LOAD_HOME_REQUEST = '@auth/home/LOAD_REQUEST',
    LOAD_HOME_SUCCESS = '@auth/home/LOAD_SUCCESS',
    LOAD_HOME_FAILURE = '@auth/home/LOAD_FAILURE',

    FACTORY_REQUEST = '@auth/home/FACTORY_REQUEST',
    FACTORY_SUCCESS = '@auth/home/FACTORY_SUCCESS',
    FACTORY_FAILURE = '@auth/home/FACTORY_FAILURE',
}

/**
 * Data Type
 */

 export interface Home extends Payload {

 }

 /**
  * State Type
  */

 export interface HomeState extends PayloadDataState<Home> {
 }