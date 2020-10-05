import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../../store'
import * as props from '../../interfaces/props';
import * as myprops from '../../interfaces/product';
import * as actions from '../../../store/modules/products/details/actions';
import history from '../../../store/history';
import FormControl from '../../commons/FormControl';
import { Button, Form } from 'reactstrap'
import LoginComponent from '../../../components/login'
import AuthContext from '../../../contexts/auth';

class ProductDetailsComponent extends Component {

    state = {
        avaliation: {
            rate: 5,
            description: ""
        }
    }

    loadProduct = () => {
        const {loadProductRequest, id} = this.props;

        loadProductRequest(id);
    }

    async loadProductAsync(wait) {
        await new Promise(resolve => setTimeout(resolve, wait)).then(() => this.loadProduct());
    }

    componentDidMount(){
        this.loadProductAsync(500); //a requisição está mais rápida do que o tempo de gravação no Mongo kkk
    }

    validateAvaliation = () => {
        const { avaliation } = this.state;
        const errors = {avaliation: {}};

        if (avaliation.rate <= 0) errors.avaliation.rate = 'Rate não pode ser vazio.'
        if (avaliation.description === '') errors.avaliation.description = 'Descrição não pode ser vazio.'

        return errors
    }

    handleAvaliationSubmit = (e) => {       
        const {rate, description} = this.state.avaliation;
        const {userToken, user} = this.props;
        const errors = this.validateAvaliation();
        
        if (Object.keys(errors.avaliation).length === 0) {
            this.props.sendProductAvaliationRequest(this.props.id, rate, description, userToken, user);
            
            if (this.props.errors?.message === undefined)
            {
                this.setState({
                    avaliation: {
                        ...this.state.avaliation,
                        rate: 5,
                        description: ""
                    }
                });                             
            }
            else
                this.setState({
                    errors: this.props.errors
                });
        } else {
            this.setState({
                errors
            })
        }
    }

    handleChangeAvalation = (e) => {
        this.setState({
            ...this.state,
            avaliation: {
                ...this.state.avaliation,
                [e.target.id]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.id]: ''
            }
        })
    }

    render() {       
        const {id, isLogged} = this.props;
        let user = this.props.user; 
        if (!user?.id)
            user = this.state.user;
        if (this.props.data)
        {
            return (
                <div id={`product-${id}`}>
                    <p>{this.props.data?.name}</p>
                    <p>{this.props.data?.price}</p>
                    <p>{this.props.data?.description}</p>
                    {
                        isLogged || this.state.isLogged ? 
                        <div id="send-avaliation">
                            <p>Oi {user.name}, nos envie sua avaliação!</p>
                            <Form onSubmit={this.handleAvaliationSubmit}>
                                <FormControl
                                    label="Rate"
                                    type="number"
                                    value={this.state.avaliation.rate}
                                    handleChange={this.handleChangeAvalation}
                                    error={this.state.errors?.avaliation?.rate}
                                />
                                <textarea id="description" rows="10" cols="30" onChange={this.handleChangeAvalation} defaultValue={this.state.avaliation.description}></textarea>
                                <p>{this.state.errors?.avaliation?.description}</p>
                                <p>{this.state.errors?.message}</p>
                                <Button color="primary">Avaliar</Button>
                            </Form>
                        </div> 
                        : 
                        <><p>Efetue login ou crie uma conta para poder avaliar!</p><LoginComponent useCallback={(isLogged, data) => this.setState({isLogged, user: data.user})}/></>
                    } 
                    <ul id="avaliations">
                    {
                        this.props.data?.avaliations?.sort((a, b) => {return new Date(b.date) - new Date(a.date);}).map(avaliation => (
                            <li key={avaliation._id} id={`avaliation-id-${avaliation._id}`}>
                                <div key={`header-session-${avaliation.id}`} id="header-session">{avaliation.date} - {avaliation.userName} | Rate: {avaliation.rate}</div>
                                <div key={`comment-session-${avaliation.id}`} id="comment-session">{avaliation.description}</div>
                                <div key={`footer-session-${avaliation.id}`} id="footer-session"></div>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            )
        }
        else
        {
            history.push('/products');
        }
    }
}

const mapStateProps = (state) => ({   
    data: state.productDetails.data,
    errors: state.productDetails.errors
});

const mapDispatchProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(ProductDetailsComponent);