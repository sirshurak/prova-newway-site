import { Payload, PayloadDataState } from "../payload/types";
import * as Models from '../../../components/models';

/**
 * Action Types
 */

export enum _types {

    LOAD_PRODUCTS_REQUEST = '@products/LOAD_PRODUCTS_REQUEST',
    LOAD_PRODUCTS_SUCCESS = '@products/LOAD_PRODUCTS_SUCCESS',
    LOAD_PRODUCTS_FAILURE = '@products/LOAD_PRODUCTS_FAILURE',
}

/**
 * Data Type
 */

export interface Avaliation extends Payload, Models.Avaliation {
}

export interface Product extends Payload, Models.Product {
}


/**
 * State Type
 */

 export interface ProductState extends PayloadDataState<Product> {
    readonly limit: number,
    readonly offset: number,
    readonly total: number
 }