import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../../store'
import * as props from '../../interfaces/props';
import * as myprops from '../../interfaces/product';
import * as actions from '../../../store/ducks/products/details/actions';
import { ProductState } from '../../../store/ducks/products/details/types';

type Props = props.StateProps & myprops.ProductDetailProps & myprops.ProductDetailDispatchProps

class ProductDetailsComponent extends Component<Props> {
    componentDidMount(){
        const {loadProductRequest, id} = this.props;

        loadProductRequest(id);
    }
    render() {        
        return <div id="product"><p>Product Detail</p></div>
    }

    static defaultProps = { id: 0, loadProductRequest: undefined};
}

const mapStateProps = (state: ApplicationState<ProductState>) => ({   
    payloads: state.payloads.data,
    id: state.payloads.id
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(ProductDetailsComponent);