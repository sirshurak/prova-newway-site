import { Reducer } from 'redux';
import { ProductState, _types } from './types';
import {PAYLOAD_INITIAL_STATE} from '../payload'

const INITIAL_STATE: ProductState = {
    data: [],
    loading: false,
    isLogged: false,
    errors: {},
    userToken: "",
    limit: 10,
    offset: 0,
    total: 0
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_PRODUCTS_REQUEST:
            return { ...state, loading: true, userToken: action.payload.userToken};
        case _types.LOAD_PRODUCTS_SUCCESS:
            return { ...state, loading: false, errors: {}, data: action.payload.data.data, total: action.payload.data.total, offset: action.payload.data.offset, limit: action.payload.data.limit};
        case _types.LOAD_PRODUCTS_FAILURE:
            return { ...state, loading: false, errors: {message: "Erro na requisição do serviço."}, data: []};
        default:
            return state; 
    }
};

export default reducer;