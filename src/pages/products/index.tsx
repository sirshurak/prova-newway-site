import React from 'react';
import { Container } from './styles';
import './styles.css'
import ProductsComponent from '../../components/products';

/**
 * Retorna página de lista de Produtos com paginação.
 */
const Products = () => {
    return (
        <Container><ProductsComponent/></Container>
    )
}

export default Products;