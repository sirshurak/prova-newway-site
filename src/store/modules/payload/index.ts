import { Reducer } from 'redux';
import { PayloadDataState, Payload, _types } from './types'

export const PAYLOAD_INITIAL_STATE: PayloadDataState<Payload> = {
    data: [],
    loading: false,
    isLogged: false,
    errors: {},
    userToken: ""
};

const reducer: Reducer<PayloadDataState<Payload>> = (state = PAYLOAD_INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_REQUEST:
            return { ...state, loading: true};
        case _types.LOAD_SUCCESS:
            return { ...state, loading: false, errors: {}, data: action.payload.data};
        case _types.LOAD_FAILURE:
            return { ...state, loading: false, errors: {message: "Erro na requisição do serviço."}, data: []};
        default:
            return state; 
    }
};

export default reducer;