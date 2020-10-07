import React from 'react';
import { Container } from './styles';
import './styles.css'

/**
 * Layout do tipo Content.
 * É onde toda página pertencente ao Layout deve estar encapsulada.
 */
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