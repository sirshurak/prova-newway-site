import { ProductState } from "../../../store/modules/products/types";
import { Product, User } from "../../models";
import { OwnProps, DispatchProps } from "../props";
import { Avaliation } from "./avaliation";

export interface ProductDetailProps extends OwnProps {
    id: number;
    data: Product;
}

export interface ProductsProps extends OwnProps {
    limit: number;
    offset: number;
    total: number;
    data: Product[];
}

export interface ProductDetailDispatchProps extends DispatchProps{    
    loadProductRequest(id: number): void
}

export interface ProductsDispatchProps extends DispatchProps{    
    loadProductsRequest(offset: number, limit: number): void;
}