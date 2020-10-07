import { call, put, all, takeLatest } from 'redux-saga/effects';
import { ActionType, action } from 'typesafe-actions';
import api from '../../../services/api'
import {_types} from './types';
import * as actions from './actions';
import sha256 from 'js-sha256';

export function* load(){
    try {       
        yield put(actions.loadSuccess({}));
    }
    catch(error) {
        yield put(actions.loadFailure(error.response.data));
    }
}
export default all([
    takeLatest(_types.LOAD_HOME_REQUEST, load),
]);