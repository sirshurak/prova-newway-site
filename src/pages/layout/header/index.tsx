import React from 'react';
import { Container } from './styles';
import {Cell} from 'styled-css-grid'
import { Link, Router } from 'react-router-dom';
import AuthContext from '../../../contexts/auth';
import history from '../../../store/history';
import Navbar from '../../../components/commons/Navbar.jsx';
import * as FaIcons from 'react-icons/fa';
import './styles.css';

const Header: React.FC<{}> = ({ children }) => {
    const {isLogged, user} = React.useContext(AuthContext);
    return (
        <Container>            
            <header>
                <div id="header">
                    <Router history={history}>
                        <Navbar 
                            logo={<Link to="/"><img width={207} height={45} src={"https://www.gruponewway.com.br/wp-content/uploads/2019/06/logotipo-newway-branco.png"} className={"attachment-large size-large"}/></Link>}
                            items={[
                            {
                                title: 'Home',
                                path: '/',
                                icon: <FaIcons.FaHome />,
                                cName: 'nav-text'
                            },
                            {
                                title: 'Produtos',
                                path: '/products',
                                icon: <FaIcons.FaCartPlus />,
                                cName: 'nav-text'
                            },
                            {
                                title: !isLogged ? "Login" : `Bem vindo, ${user.name}`,
                                path: '/login',
                                icon: <FaIcons.FaUser />,
                                cName: 'nav-text'
                            }
                        ]}/>
                        {/*<Link to="/"><img width={207} height={45} src={"https://www.gruponewway.com.br/wp-content/uploads/2019/06/logotipo-newway-branco.png"} className={"attachment-large size-large"}/></Link>
                        <ul className="menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Produtos</Link></li>
                            <li><Link to="/login">{!isLogged ? "Login" : `Bem vindo, ${user.name}`}</Link></li>
                    </ul>*/}
                    </Router>
                    {children}
                </div>
            </header>            
        </Container>
    )
}

export default Header;