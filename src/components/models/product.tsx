import { Avaliation } from "./avaliation";

export interface Product {
    _id: number,
    name: string,
    price: number,
    description: string
    avaliations: Avaliation[]
}