import React from 'react';
import { Container } from './styles';
import {Cell} from 'styled-css-grid'

const Footer: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <footer>
                <div id="footer">
                    <h1>Footer</h1>
                    {children}
                </div>
            </footer>
        </Container>
    )
}

export default Footer;