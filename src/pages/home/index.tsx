import React from 'react';
import { Container } from './styles';
import Auth from '../partials/login';
import { AuthProvider } from '../../contexts/auth';
import { Redirect } from 'react-router-dom';

const Home = (values: any) => {    
    const search = values?.location?.search;
    const redirectTo = new URLSearchParams(search).get("redirectTo");
    return (       
        <>
        {redirectTo ? <Redirect to={redirectTo} /> : <></>}
        <Container>
            <div id="home"></div>
        </Container>
        </>
    )
}

export default Home;