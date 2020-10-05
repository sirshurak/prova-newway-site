import { Reducer } from 'redux';
import { ProductState , _types } from './types'

const INITIAL_STATE: ProductState = {
    data: [],
    loading: false,
    isLogged: false,
    errors: {},
    userToken: "",
    id: 0
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_PRODUCT_REQUEST:
            return { ...state, loading: true};
        case _types.LOAD_PRODUCT_SUCCESS:
            return { ...state, loading: false, errors: null, data: action.payload.data};
        case _types.LOAD_PRODUCT_FAILURE:
            return { ...state, loading: false, errors: {message: action.payload.data?.message}, data: []};
        case _types.SEND_PRODUCT_AVALATION_REQUEST:
            return { ...state, loading: true};
        case _types.SEND_PRODUCT_AVALATION_SUCCESS:
            return { ...state, loading: false, errors: null};
        case _types.SEND_PRODUCT_AVALATION_FAILURE:
            return { ...state, loading: false, errors: {message: action.payload.data?.message}};
        default:
            return state; 
    }
};

export default reducer;