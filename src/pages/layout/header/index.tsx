import React from 'react';
import { Container } from './styles';
import {Cell} from 'styled-css-grid'
import { Link, Router } from 'react-router-dom';
import AuthContext from '../../../contexts/auth';
import history from '../../../store/history';

const Header: React.FC<{}> = ({ children }) => {
    const {isLogged, user} = React.useContext(AuthContext);
    return (
        <Container>            
            <header>
                <div id="header">
                    <img width={207} height={45} src={"https://www.gruponewway.com.br/wp-content/uploads/2019/06/logotipo-newway-branco.png"} className={"attachment-large size-large"}/>
                    <Router history={history}>
                        <ul className="menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Produtos</Link></li>
                            <li><Link to="/login">{!isLogged ? "Login" : `Bem vindo, ${user.name}`}</Link></li>
                        </ul>
                    </Router>
                    {children}
                </div>
            </header>            
        </Container>
    )
}

export default Header;