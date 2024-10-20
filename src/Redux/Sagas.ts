import AppSaga from './Sagas/Saga';
import { all } from 'redux-saga/effects'
// import AuthSaga from './Sagas/AuthenticationSaga';
/** @description combine sagas.*/
export default function* Sagas() {
    yield all([
        // Combine all saga here like so AuthSaga(),
        AppSaga(),
    ]);
}