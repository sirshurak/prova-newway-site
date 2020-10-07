import { Reducer } from 'redux';
import { ProductState, _types } from './types';

export const INITIAL_STATE: ProductState = {
    data: [],
    loading: false,
    isLogged: false,
    errors: {},
    userToken: "",
    limit: 20,
    offset: 0,
    total: 20
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case _types.LOAD_PRODUCTS_SUCCESS:
            return { ...state, loading: false, errors: {}, data: action.payload.data.data, total: action.payload.data.total, offset: action.payload.data.offset, limit: action.payload.data.limit};
        case _types.LOAD_PRODUCTS_FAILURE:
            return { ...state, loading: false, errors: {message: "Erro na requisição do serviço."}, data: []};
        default:
            return state; 
    }
};

export default reducer;