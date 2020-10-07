/**
 * Action Types
 */

import { Payload, PayloadDataState } from "../payload/types";

export enum _types {
    LOAD_HOME_REQUEST = '@auth/home/LOAD_REQUEST',
    LOAD_HOME_SUCCESS = '@auth/home/LOAD_SUCCESS',
    LOAD_HOME_FAILURE = '@auth/home/LOAD_FAILURE',
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