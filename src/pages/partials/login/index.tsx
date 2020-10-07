import React, {useEffect} from 'react';
import { Container } from './styles';
import LoginComponent from '../../../components/login';
import AuthContext from '../../../contexts/auth';
import './styles.css'

/**
 * Partial de Login.
 */
const Login = () => {
    return (
        <Container>
            <div id="login">                
                <LoginComponent>
                    <img src="https://scontent.fbau1-1.fna.fbcdn.net/v/t1.0-9/37278905_2218121124868173_1980422236368011264_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=Pid_gokbcDIAX86ZwXd&_nc_ht=scontent.fbau1-1.fna&oh=03c4e648e28d294a9571bbe5ed0f74a0&oe=5F9F7F1C"/>
                </LoginComponent>
            </div>
        </Container>
    )
}



export default Login;