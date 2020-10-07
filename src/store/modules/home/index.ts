import { Reducer } from 'redux';
import { HomeState, _types } from './types'

export const INITIAL_STATE: HomeState = {
    data: [],
    loading: false,
    isLogged: false,
    errors: {},
    userToken: ""
};

const reducer: Reducer<HomeState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_HOME_REQUEST:
            return { ...state, loading: true };
        case _types.LOAD_HOME_SUCCESS:
            return { ...state, loading: false, errors: null};
        case _types.LOAD_HOME_FAILURE:
            return { ...state, loading: false, errors: {message: action.payload.data?.message}, data: []};

        default:
            return state; 
    }
};

export default reducer;