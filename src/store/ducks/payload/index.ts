import { Reducer } from 'redux';
import { PayloadDataState, Payload, _types } from './types'

const INITIAL_STATE: PayloadDataState<Payload> = {
    data: [],
    loading: false,
    error: false,
    userId: "",
    userToken: ""
};

const reducer: Reducer<PayloadDataState<Payload>> = (state = INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type) {
        case _types.LOAD_REQUEST:
            return { ...state, loading: true};
        case _types.LOAD_SUCCESS:
            return { ...state, loading: false, errors: [], data: action.payload.data};
        case _types.LOAD_FAILURE:
            return { ...state, loading: false, errors: [{message: "Erro na requisição do serviço."}], data: []};
        default:
            return state; 
    }
};

export default reducer;