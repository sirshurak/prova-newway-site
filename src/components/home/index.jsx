import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/modules/home/actions';
import { bindActionCreators } from 'redux';
import packageJson from '../../../package.json';
import { Button } from 'reactstrap'

/**
 * Componente para página Home.
 * 
 */
class HomeComponent extends Component {
    componentDidMount(){
        this.load(0, 500);
    }

    load = (ms, msCount) => {
        this.LoadAsync(ms);
        this.CheckCountAsync(msCount, "countProduct");
        this.CheckCountAsync(msCount, "countUser")      
    }

    async LoadAsync(wait) {
        new Promise(resolve => 
            setTimeout(resolve, wait)
        )
        .then(()=> 
            this.props.load()
        ); 
    }

    async CheckCountAsync(wait, id) {
        new Promise(resolve => 
            setTimeout(resolve, wait)
        )
        .then(()=> 
            this.setState({
                ...this.state,
                errors: this.props.errors,
                [id]: this.props[id]
            })
        ); 
    }

    addProducts = () => {
        this.props.factory("product", 10);
        this.load(500,500);
    }

    addUsers = () => {
        this.props.factory("user", 10);
        this.load(500,500);
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
                        <p>Total: {this.props.countUser}</p>
                        <Button color="primary" onClick={this.addUsers}>Adicionar 10 usuários</Button>
                    </div>
                    <div className="function-product">
                        <h3>Produtos</h3>
                        <p>Total: {this.props.countProduct}</p>
                        <Button color="primary" onClick={this.addProducts}>Adicionar 10 produtos</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = (state) => ({ 
    countUser: state.home.countUser,
    countProduct: state.home.countProduct,
    errors: state.home.errors
});

const mapDispatchProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateProps, mapDispatchProps)(HomeComponent)