import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/modules/home/actions';
import { bindActionCreators } from 'redux';
import packageJson from '../../../package.json';

class HomeComponent extends Component {
    componentDidMount(){
    }

    render() {
        return (
            <div id="home">
                <div className="introduction">
                    <h1>Prova para New Way v{packageJson.version}</h1>
                    <p>Neste site é possível efetuar a avaliação de produtos através de um registro automático, bem como, cadastro de novos produtos.</p>                    
                </div>
                <div className="function">
                    <div className="function-user">
                        <h3>Usuários</h3>
                    </div>
                    <div className="function-product">
                        <h3>Produtos</h3>
                        <p></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = (state) => ({ 
});

const mapDispatchProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateProps, mapDispatchProps)(HomeComponent)