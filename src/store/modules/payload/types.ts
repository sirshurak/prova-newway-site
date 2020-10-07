/**
 * Action Types
 */

export enum _types {
    LOAD_REQUEST = '@payload/LOAD_REQUEST',
    LOAD_SUCCESS = '@payload/LOAD_SUCCESS',
    LOAD_FAILURE = '@payload/LOAD_FAILURE',
}

/**
 * Data Type
 */

 export interface Payload {
 }


 /**
  * State Type
  */

export interface PayloadState {
    readonly loading: boolean 
    readonly isLogged: boolean
    readonly errors: {[key: string]: string} | null
    readonly userToken: String
}

export class KeyValuePair {
    [key: string]: string
}

export interface PayloadDataState<P> extends PayloadState   {
      readonly data: P[] 
}