import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import * as props from '../interfaces/props';
import * as myprops from '../interfaces/product';
import * as actions from '../../store/modules/products/actions';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

type Props = props.StateProps & myprops.ProductsProps & myprops.ProductsDispatchProps

class ProductsComponent extends Component<Props> {
    componentDidMount(){
        const {loadProductsRequest, limit, offset} = this.props;

        loadProductsRequest(offset, limit);
    }
    render() {        
        const { loadProductsRequest, data, total, limit, offset } = this.props;
        console.log(limit);
        return (
            <div id="products">
                <p>Products | total: {total}</p>
                <ul id="products-list">{data ? data.map(product => (
                    <li key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img src={product.images ? product.images[0] : "http://whatcommasoniclodge.org/wp-content/uploads/2016/12/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg"}/>
                            <div className="product-content">                                
                                <span className={"product-price"}>{product.price}</span>
                                <p className={"product-title"}>{product.name}</p>
                            </div>
                        </Link>
                    </li>)) : <li/>}
                </ul>
                <ReactPaginate 
                    pageCount={Math.ceil(total/limit)} 
                    pageRangeDisplayed={5} 
                    marginPagesDisplayed={10} 
                    forcePage={Math.ceil(offset/limit)}
                    onPageChange={({selected}) => {loadProductsRequest(limit*selected,limit)}}
                />
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