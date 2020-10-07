import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import * as props from '../interfaces/props';
import * as myprops from '../interfaces/product';
import * as actions from '../../store/modules/products/actions';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import {formatarReal} from '../../utils/functions';
import config from '../../config';
import { Product } from '../models';
import { INITIAL_STATE } from '../../store/modules/products';

type Props = props.StateProps & myprops.ProductsProps & myprops.ProductsDispatchProps

/**
 * Componente da página Produtos.
 * @param {number} limit quantidade de produtos para buscar
 * @param {number} offset registros à ignorar 
 */
class ProductsComponent extends Component<Props, any> {

    state = INITIAL_STATE;

    componentDidMount(){
        this.defaultLoad();
    }

    async CheckProducts(wait: number){
        new Promise(resolve => setTimeout(resolve,wait)).then(() => {
            if (this.props.data?.length)
            {
                this.setState({
                    ...this.state,
                    data: this.props.data,
                    total: this.props.total,
                    offset: this.props.offset
                });
            }
        })
    }

    defaultLoad() {
        const {limit, offset} = this.state; 
        this.paginate(offset, limit);       
    }

    paginate(offset: number, limit: number) {           
        const {loadProductsRequest} = this.props;
        loadProductsRequest(offset, limit);
        this.CheckProducts(500);
    }

    render() {       
        const { data, total, limit, offset } = this.state;
        return (
            <div id="products">
                <ul id="products-list">{data ? data.map((product: Product) => (
                    <li key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img src={product.images ? product.images[0] : config.NO_IMAGE_DEFAULT} alt=""/>
                            <div className="product-content">                                
                                <span className={"product-price"}>{formatarReal(product.price)}</span>
                                <p className={"product-title"}>{product.name}</p>
                            </div>
                            <p className={"product-avaliations"}>{product.avaliations?.length ? (`${product.avaliations.length} ${product.avaliations.length > 1 ? "avaliações" : "avaliação"}`) : "nenhuma avaliação"}</p>
                        </Link>
                    </li>)) : <li/>}
                </ul>
                <div id="products-pagination">
                <p className="products-total">{total} produto(s)</p>
                    <ReactPaginate 
                        pageCount={Math.ceil(total/limit)} 
                        pageRangeDisplayed={5} 
                        marginPagesDisplayed={10} 
                        forcePage={Math.ceil(offset/limit)}
                        onPageChange={({selected}) => {this.paginate(limit*selected,limit)}}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page"}
                    />
                </div>
            </div>
        )
    }

    static defaultProps = { limit: 20, offset:0, isLogged: false, loadProductsRequest: undefined};
}

const mapStateProps = (state: any) => ({   
    data: state.products.data,
    offset: state.products.offset,
    total: state.products.total
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(ProductsComponent);