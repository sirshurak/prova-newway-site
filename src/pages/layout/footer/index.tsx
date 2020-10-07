import React from 'react';
import { Container } from './styles';
import './styles.css';
import {Cell} from 'styled-css-grid'

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <footer>
                <div id="footer">
                    <h3>Prova solucionada por <a href="https://github.com/sirshurak" target="_blank">Vinicius Tonelli</a></h3>
                    {children}
                </div>
            </footer>
        </Container>
    )
}

export default Footer;