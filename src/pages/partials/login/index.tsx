import React, {useEffect} from 'react';
import { Container } from './styles';
import LoginComponent from '../../../components/login';
import AuthContext from '../../../contexts/auth';

const Login = () => {
    const props = React.useContext(AuthContext);
    return (
        <Container>
            <div id="login">
                <LoginComponent {...props}/>
            </div>
        </Container>
    )
}



export default Login;