import React from 'react';
import { Container } from './styles';
import {Cell} from 'styled-css-grid'

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <footer>
                <div id="footer">
                    <h3>Prova solucionada por Vinicius Tonelli</h3>
                    {children}
                </div>
            </footer>
        </Container>
    )
}

export default Footer;