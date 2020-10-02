import { Reducer } from 'redux';
import { ProductState , _types } from './types'

const INITIAL_STATE: ProductState = {
    data: [],
    loading: false,
    error: false,
    userId: "",
    userToken: "",
    id: 0
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type) {
        case _types.LOAD_PRODUCT_REQUEST:
            return { ...state, loading: true};
        case _types.LOAD_PRODUCT_SUCCESS:
            return { ...state, loading: false, errors: [], data: action.payload.data};
        case _types.LOAD_PRODUCT_FAILURE:
            return { ...state, loading: false, errors: [{message: "Erro na requisição do serviço."}], data: []};
        default:
            return state; 
    }
};

export default reducer;