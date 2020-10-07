import React from 'react';
import { Container } from './styles';
import './styles.css'
import ProductDetailsComponent from '../../../components/products/details/index.jsx';
import AuthContext from '../../../contexts/auth';

const Product = (values: any) => {
    const {user, userToken, isLogged} = React.useContext(AuthContext)
    return (
        <Container><ProductDetailsComponent id={values.match.params.id} user={user} userToken={userToken} isLogged={isLogged}/></Container>
    )
}

export default Product;
