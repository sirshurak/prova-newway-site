import React, {useEffect} from 'react';
import { Container } from './styles';
import LoginComponent from '../../../components/login';
import AuthContext from '../../../contexts/auth';

const Login = () => {
    const props = React.useContext(AuthContext);
    return (
        <Container><LoginComponent {...props}/></Container>
    )
}



export default Login;