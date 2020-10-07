import React from 'react';
import { Container } from './styles';
import { Link, Router } from 'react-router-dom';
import AuthContext from '../../../contexts/auth';
import history from '../../../store/history';
import Navbar from '../../../components/commons/Navbar.jsx';
import * as FaIcons from 'react-icons/fa';
import './styles.css';


/**
 * Layout do tipo Header
 */
const Header: React.FC<{}> = ({ children }) => {
    const {isLogged, user} = React.useContext(AuthContext);
    return (
        <Container>            
            <header>
                <div id="header">
                    <Router history={history}>
                        <Navbar 
                            logo={<Link to="/"><img alt="" width={207} height={45} src={"https://www.gruponewway.com.br/wp-content/uploads/2019/06/logotipo-newway-branco.png"} className={"attachment-large size-large"}/></Link>}
                            items={[
                            {
                                title: 'Home',
                                path: '/',
                                icon: <FaIcons.FaHome />,
                                cName: 'nav-text',
                                name: 'home' 
                            },
                            {
                                title: 'Produtos',
                                path: '/products',
                                icon: <FaIcons.FaCartPlus />,
                                cName: 'nav-text',
                                name: 'products' 
                            },
                            {
                                title: !isLogged ? "Login" : `Bem vindo, ${user.name}`,
                                path: '/login',
                                icon: <FaIcons.FaUser />,
                                cName: 'nav-text',
                                name: 'login' 
                            }
                        ]}/>
                    </Router>
                    {children}
                </div>
            </header>            
        </Container>
    )
}

export default Header;