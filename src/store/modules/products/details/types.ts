import { Payload, PayloadDataState } from "../../payload/types";
import * as Models from '../../../../components/models';
/**
 * Action Types
 */

export enum _types {
    LOAD_PRODUCT_REQUEST = '@products/detail/LOAD_PRODUCT_REQUEST',
    LOAD_PRODUCT_SUCCESS = '@products/detail/LOAD_PRODUCT_SUCCESS',
    LOAD_PRODUCT_FAILURE = '@products/detail/LOAD_PRODUCT_FAILURE',
    
    SEND_PRODUCT_AVALATION_REQUEST = '@products/detail/SEND_PRODUCT_AVALATION_REQUEST',
    SEND_PRODUCT_AVALATION_SUCCESS = '@products/detail/SEND_PRODUCT_AVALATION_SUCCESS',
    SEND_PRODUCT_AVALATION_FAILURE = '@products/detail/SEND_PRODUCT_AVALATION_FAILURE',
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
     readonly id: number
 }