import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text} from 'react-native'
import { bindActionCreators, Dispatch } from 'redux'
import * as actions from '../../../store/modules/products/details/actions';
import history from '../../../store/history';
import { Button, Form } from 'reactstrap'
import LoginComponent from '../../../components/login'
import config from '../../../config';
import {formatarReal} from '../../../utils/functions';
import faker from 'faker';
import { FormFeedback } from 'reactstrap'
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

class ProductDetailsComponent extends Component {

    state = {
        avaliation: {
            rate: 5,
            description: "",
            takeCount: 5,
            takeLimit: 5
        },
        longDescription: faker.lorem.paragraphs(5,"<br/><br/>")
    }

    loadProduct = () => {
        const {loadProductRequest, id} = this.props;

        loadProductRequest(id);
        this.loadDefaultImageAsync(500);
    }

    async loadDefaultImageAsync(wait) {
        await new Promise(resolve => setTimeout(resolve,wait)).then(() => {
            const imgSelected = this.props.data?.images?.find(x=>x!==undefined) ?? config.NO_IMAGE_DEFAULT;
            this.setState({
                imgSelected: imgSelected,
                imgIndex: 0
            });
        });
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

    changeGallerySelected = (index) => {
        this.setState({
            imgSelected: this.props.data.images[index],
            imgIndex: index
        });
    }

    changeAvaliationRate = (e) => {
        this.setState({
            ...this.state, 
            avaliation: { 
                ...this.state.avaliation, 
                rate: e.rating
            }
        });
    }

    render() {       
        const {id, isLogged} = this.props;
        let user = this.props.user; 
        if (!user?.id)
            user = this.state.user;
        if (this.props.data)
        {
            return (
            <div className="product-detail">
                <div className="product-detail-container">
                    <div className="product-detail-column-left">
                        <div className="product-detail-gallery">
                            <div className="gallery-selected">
                                <img src={this.state.imgSelected}/>
                            </div>
                            <div className="gallery-miniatures">
                                {this.props.data?.images?.map((image, index) => <div className={`miniature ${index === this.state.imgIndex ? 'active' : ''}`} key={index} onClick={() => this.changeGallerySelected(index)}><img src={image}/></div>)}
                                {this.props.data?.images?.length <= 0 ? <div className={`miniature active`}><img src={config.NO_IMAGE_DEFAULT}/></div> : <></>}                                                                             
                            </div>
                        </div>                        
                    </div> 
                    <div className="product-detail-column-right">
                        <div className="product-detail-ecommerce">
                            <div className="product-detail-name">
                                <h1>{this.props.data?.name}</h1>
                            </div>
                            <div className="product-detail-price">
                                <span>{formatarReal(this.props.data?.price ?? 0)}</span>
                            </div>                            
                            <div className="product-detail-description">
                                <h2>{this.props.data?.description}</h2>
                            </div>
                            <div className="product-detail-actions">
                                <Button color="primary">Comprar</Button>
                                <Button color="secondary">Adicionar ao carrinho</Button>
                            </div>
                        </div>
                    </div>
                </div>  
                <div id={`product-${id}`} className="product-detail-container">
                    <div className="product-detail-column-left">
                        <div className="product-detail-long-description">
                            <h2>Descrição</h2>
                            <p dangerouslySetInnerHTML={{__html: this.state.longDescription}}></p>
                        </div>
                        <div className="product-detail-avaliation">
                            <h2>Avaliações</h2>
                            {
                            isLogged || this.state.isLogged ? 
                            <div id="send-avaliation">
                                <h3>{user.name}, nos envie sua avaliação!</h3>
                                <Form onSubmit={this.handleAvaliationSubmit}>
                                    <Rater onRate={this.changeAvaliationRate} rating={this.state.avaliation.rate}/>
                                    <FormFeedback>{this.state.errors?.avaliation?.rate}</FormFeedback>
                                    <textarea id="description" rows="10" cols="30" onChange={this.handleChangeAvalation} defaultValue={this.state.avaliation.description}></textarea>
                                    <p>{this.state.errors?.avaliation?.description}</p>
                                    <p>{this.state.errors?.message}</p>
                                    <Button color="primary">Avaliar</Button>
                                </Form>
                            </div> 
                            : 
                            <><p>Efetue login ou crie uma conta para poder avaliar!</p><LoginComponent useCallback={(isLogged, data) => this.setState({isLogged, user: data.user})}/></>
                            } 
                            <h3>Mais recentes</h3>
                            <ul id="avaliations">
                            {
                                this.props.data?.avaliations?.sort((a, b) => {return new Date(b.date) - new Date(a.date);})
                                    .slice(0, this.state.avaliation.takeCount)
                                    .map(avaliation => (
                                        <li key={avaliation._id} id={`avaliation-id-${avaliation._id}`}>
                                            <div key={`header-session-${avaliation.id}`} id="header-session"><Rater rating={avaliation.rate} interactive={false}/><span>  {avaliation.userName}</span></div>
                                            <div key={`comment-session-${avaliation.id}`} id="comment-session">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                    <path fill="#000" fillOpacity=".25" fillRule="evenodd" d="M0 0h1v11h11v1H0z"></path>
                                                </svg>
                                                <Text numberOfLines={5}>{avaliation.description}</Text></div>
                                            <div key={`footer-session-${avaliation.id}`} id="footer-session"><span>{new Date(avaliation.date).toLocaleString()}</span></div>
                                        </li>
                                    )
                                )
                            }                            
                            </ul>
                            {
                                this.props.data?.avaliations?.length && (this.state.avaliation.takeCount <= this.props.data?.avaliations?.length)
                                ? <Button color="secondary" onClick={() => { this.setState({...this.state, avaliation: {...this.state.avaliation, takeCount: this.state.avaliation.takeCount+this.state.avaliation.takeLimit }}) }}>Carregar Mais</Button>
                                : <></>
                            }
                        </div>
                    </div>  
                    <div className="product-detail-column-right">
                    </div>
                </div>  
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