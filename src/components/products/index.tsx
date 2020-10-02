import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import * as props from '../interfaces/props';
import * as myprops from '../interfaces/product';
import * as actions from '../../store/ducks/products/actions';
import ReactPaginate from 'react-paginate';

type Props = props.StateProps & myprops.ProductsProps & myprops.ProductsDispatchProps

class ProductsComponent extends Component<Props> {
    componentDidMount(){
        const {loadProductsRequest, limit, offset} = this.props;

        loadProductsRequest(offset, limit);
    }
    render() {        
        const { loadProductsRequest, data, total, limit, offset } = this.props;
        return (
            <div id="products">
                <p>Products | total: {total}</p>
                <ul>{data ? data.map(product => (<li key={product._id}> {product._id} - {product.name}</li>)) : <li/>}</ul>
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

    static defaultProps = { limit: 10, offset:0, loadProductsRequest: undefined};
}

const mapStateProps = (state: any) => ({   
    data: state.products.data,
    limit: state.products.limit,
    offset: state.products.offset,
    total: state.products.total
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(ProductsComponent);