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

 export interface Error {
    message: string
}

 /**
  * State Type
  */

export interface PayloadState {
    readonly loading: boolean 
    readonly error: boolean 
    readonly userId: String
    readonly userToken: String
}

export interface PayloadDataState<P extends Payload = {}> extends PayloadState {
      readonly data: P[]
}