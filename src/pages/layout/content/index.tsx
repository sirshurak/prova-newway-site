import React from 'react';
import { Container } from './styles';
import {Cell} from 'styled-css-grid'

const Content: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <main>
                <div id="content">
                    { children }
                </div>
            </main>
        </Container>
    )
}

export default Content;