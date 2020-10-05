import userEvent from '@testing-library/user-event';
import { Reducer } from 'redux';
import { AuthState, _types } from './types'
import {User} from '../../../components/models'

export const INITIAL_USER: User = {
    id: null, //gambiarra porque o React.useContext deve ser tipado os objetos
    name: "",
    email: "",
    password: "",
    joinAt: new Date(),
    lastVisit: new Date(),
}

export const INITIAL_STATE: AuthState = {
    data: [],
    loading: false,
    isLogged: false,
    user: INITIAL_USER,
    errors: {},
    userToken: ""
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case _types.LOAD_LOGIN_REQUEST:
            return { ...state, loading: true };
        case _types.LOAD_LOGIN_SUCCESS:
            return { ...state, loading: false, isLogged: true, errors: null, user: action.payload.data.data, userToken: action.payload.data.token};
        case _types.LOAD_LOGIN_FAILURE:
            return { ...state, loading: false, isLogged: false, errors: {message: action.payload.data?.message}, data: []};

        case _types.LOAD_LOGOUT_REQUEST:
            return { ...state, loading: true };
        case _types.LOAD_LOGOUT_SUCCESS:
            return { ...state, loading: false, isLogged: false, errors: null, user: INITIAL_USER, data: [], userToken: "", userId: ""};
        case _types.LOAD_LOGOUT_FAILURE:
            return { ...state, loading: false, errors: {message: "Erro ao efetuar logout."}};
        
        case _types.CREATE_NEW_RANDOM_USER_REQUEST:
            return { ...state, loading: true };
        case _types.CREATE_NEW_RANDOM_USER_SUCCESS:
            console.log(action.payload.data);
            return { ...state, loading: false, isLogged: false, errors: null, user: action.payload.data, userToken: ""};
        case _types.CREATE_NEW_RANDOM_USER_FAILURE:
            return { ...state, loading: false, isLogged: false, errors: {message: action.payload.data?.message}, data: []};
             
        case _types.CREATE_NEW_USER_REQUEST:
            return { ...state, loading: true };
        case _types.CREATE_NEW_USER_SUCCESS:
            return { ...state, loading: false, isLogged: false, errors: null, user: action.payload.data, userToken: ""};
        case _types.CREATE_NEW_USER_FAILURE:
            return { ...state, loading: false, isLogged: false, errors: {message: action.payload.data?.message}, data: []};
                

        default:
            return state; 
    }
};

export default reducer;