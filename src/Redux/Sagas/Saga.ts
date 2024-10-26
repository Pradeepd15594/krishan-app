import { call, put, takeLatest, take, select, delay } from "redux-saga/effects";
import { types } from "../Types/SagaType";
import AppService from '../../Services/App.Service';
import { persistor } from "../Store";
const STORAGE_KEY = process.env.STORAGE_KEY;
const selectGuruList = (state:any) => state.AppReducer.guruList;
// const token = localStorage.getItem(`${STORAGE_KEY}/token`);

/**
 * @description getStudents
 */
function* getStudentsList({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getStudents, payload);
        if (res && res.data && res.data && res.data.length) {
            yield put({ type: types.SET_TOTAL_STUDENT_COUNT, payload: res?.totalCount });
            yield put({ type: types.GET_STUDENT_LIST_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.GET_STUDENT_LIST_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error createNewChallenges*');
        yield put({ type: types.GET_STUDENT_LIST_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}


/**
 * @description getStudents
 */
function* getClassListByPagenationDateRange({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getClassListByPagenationDateRange, payload);
        if (res && res.data && res.data && res.data.length) {
            yield put({ type: types.SET_TOTAL_CLASS_COUNT, payload: res?.totalCount });
            yield put({ type: types.GET_CLASS_LIST_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.GET_CLASS_LIST_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error createNewChallenges*');
        yield put({ type: types.GET_CLASS_LIST_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}


/**
 * @description addNewStudent
 */
function* addNewStudent({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.addStudent, payload);
        console.log(res, 'res-res');
        
        if (res && res.data && res.status == true) {
            yield put({ type: types.ADD_STUDENT_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.ADD_STUDENT_FAILURE, payload: res?.message });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error addNewStudent*');
        yield put({ type: types.ADD_STUDENT_FAILURE, payload: {} });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description createNewClass
 */
function* createNewClass({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.addNewClass, payload);
        if (res && res.data && res.status == true) {
            yield put({ type: types.ADD_NEW_CLASS_SUCCESS, payload: res.data });
            yield put({ type: types.REDIRECT_SUCCESS, payload: 'back' })
        } else {
            yield put({ type: types.ADD_NEW_CLASS_SUCCESS, payload: {} });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error addNewStudent*');
        yield put({ type: types.ADD_NEW_CLASS_FAILURE, payload: {} });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description getClassListByDate
 */
function* getClassListByDate({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getClassListByDate, payload);
        if (res && res.data && res.data && res.data.length) {
            yield put({ type: types.GET_CLASS_LIST_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.GET_CLASS_LIST_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error createNewChallenges*');
        yield put({ type: types.GET_CLASS_LIST_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description getClassListByDateRange
 */
function* getClassListByDateRange({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getClassByDateRange, payload);
        if (res && res.data && res.data && res.data.length) {
            yield put({ type: types.GET_CLASS_LIST_BY_RANGE_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.GET_CLASS_LIST_BY_RANGE_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error createNewChallenges*');
        yield put({ type: types.GET_CLASS_LIST_BY_RANGE_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description getGuruList
 */
function* getGuruList({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getGuruList);
        if (res && res.data && res.data && res.data.length) {
            yield put({ type: types.GET_GURU_LIST_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.GET_GURU_LIST_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error getGuruList*');
        yield put({ type: types.GET_GURU_LIST_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description getGuruList
 */
function* getAttandanceListBYClassSelect({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getAttandanceListBYClassId, payload.classId);
        if (res && res.result && res.result && res.result.length) {
            yield put({ type: types.GET_CLASS_ATTANDANCE_SUCCESS, payload: res.result });
        } else {
            yield put({ type: types.GET_CLASS_ATTANDANCE_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error getAttandanceListBYClassSelect*');
        yield put({ type: types.GET_CLASS_ATTANDANCE_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description searchStudentByName
 */
function* searchStudentByTermAndCheckAttandance({ payload }: any): any {
    try {
        if (payload?.term == '') {
            yield put({ type: types.SEARCH_STUDENTS_SUCCESS, payload: [] });
        } else {
            yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
            const res: any = yield call(AppService.searchStudentAndCheckStudentPresentInClass, payload);
            // const res:any = yield call(AppService.searchStudentByName, payload);
            if (res && res.result && res.result && res.result.length) {
                yield put({ type: types.SEARCH_STUDENTS_SUCCESS, payload: res.result });
            } else {
                yield put({ type: types.SEARCH_STUDENTS_FAILURE, payload: [] });
            }
            yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
        }

    } catch (error) {
        console.log(error, 'error searchStudentByName*');
        yield put({ type: types.SEARCH_STUDENTS_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}


/**
 * @description searchStudentByNameAndMobile
 */
function* searchStudentByNameAndMobile({ payload }: any): any {
    try {
        if (payload?.term == '' || payload?.term == undefined || payload?.term == null) {
            yield put({ type: types.SEARCH_STUDENTS_BY_NN_SUCCESS, payload: [] });
        } else {
            yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
            const res: any = yield call(AppService.searchStudentByNameAndMobile, payload);
            // const res:any = yield call(AppService.searchStudentByName, payload);
            if (res && res.result && res.result && res.result.length) {
                yield put({ type: types.SEARCH_STUDENTS_BY_NN_SUCCESS, payload: res.result });
            } else {
                yield put({ type: types.SEARCH_STUDENTS_BY_NN_FAILURE, payload: [] });
            }
            yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
        }

    } catch (error) {
        console.log(error, 'error searchStudentByName*');
        yield put({ type: types.SEARCH_STUDENTS_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description searchStudentByName
 */
function* updateStudentAttandence({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.updateAttandanceByClass, payload);
        // Check if res.result is already an object
        const result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result;
        if (result && result.length) {
            yield put({ type: types.UPDATE_STUDENTS_ATTANDANCE_SUCCESS, payload: result });
        } else {
            yield put({ type: types.UPDATE_STUDENTS_ATTANDANCE_FAILURE, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error updateStudentAttandence*');
        yield put({ type: types.UPDATE_STUDENTS_ATTANDANCE_FAILURE, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description setSelectedClass
 */
function* setSelectedClass({ payload }: any): any {
    try {
        yield put({ type: types.SET_SELECTED_CLASS_SUCCESS, payload: payload });
    } catch (error) {
        yield put({ type: types.SET_SELECTED_CLASS_SUCCESS, payload: { _id: '', className: '', description: '', startDateTime: '', endDateTime: '' } });
    }
}

/**
 * @description setAuthRequest
 */
function* setAuthRequest({ payload }: any): any {
    yield put({ type: types.SET_AUTH_SUCCESS, payload: payload });
}

/**
 * @description createRedirectRequest
 */
function* createRedirectRequest({ payload }: any): any {
    yield put({ type: types.REDIRECT_SUCCESS, payload: payload });
}

/**
 * @description createRedirectRequest
 */
function* logoutUserRequest({ payload }: any): any {
    yield localStorage.clear();
    persistor.purge().then(async()=>{
        await persistor.purge();
    })

    yield put({ type: types.LOGOUT_USER_SUCCESS, payload: payload });
}

/**
 * @description getStudentTimelineListBySId
 */
function* getStudentTimelineListBySId({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getStudentsTimelineByStudentId, payload);

        console.log(res, 'GET_STUDENT_TIMELINE_SUCCESS');
        // Check if res.result is already an object
        const result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result;

        if (result && result?.length) {
            yield put({ type: types.GET_STUDENT_TIMELINE_SUCCESS, payload: result });
        } else {
            console.log('PPPP');
            yield put({ type: types.GET_STUDENT_TIMELINE_SUCCESS, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error updateStudentAttandence*');
        yield put({ type: types.GET_STUDENT_TIMELINE_SUCCESS, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description addNewGuru
 */
function* addNewGuru({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.addNewGuru, payload);
        const result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result;
        if (result && result?.length) {
            yield put({ type: types.ADD_NEW_GURU_SUCCESS, payload: result });
        } else {
            yield put({ type: types.ADD_NEW_GURU_SUCCESS, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error addNewGuru*');
        yield put({ type: types.ADD_NEW_GURU_SUCCESS, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description setLoadingRequest
 */
function* setLoadingRequest({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: payload ? true : false });
    } catch (error) {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}

/**
 * @description set THEME
 */
function* setThemeRequest({ payload }: any): any {
    try {
        console.log(payload, 'payload theeme');
        
        yield put({ type: types.SET_THEME_SUCCESS, payload: payload });
    } catch (error) {
        yield put({ type: types.SET_THEME_SUCCESS, payload: 'light' });
    }
}

/**
 * @description deleteGuru
 */
function* deleteGuru({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.deleteNewGuru, payload);
        if (res && res?.status== true &&res.statusCode == 200) {
            const guruList = yield select(selectGuruList);
            yield put({ type: types.DELETE_GURU_SUCCESS, payload: guruList.filter((item:any)=>item?._id!=payload) });
        } else {
            yield put({ type: types.DELETE_GURU_SUCCESS, payload: [] });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error DELETE_GURU_SUCCESS*');
        yield put({ type: types.DELETE_GURU_SUCCESS, payload: [] });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}



/**
 * @description getDashboardData
 */
function* getCountDashboardData({ payload }: any): any {
    try {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: true });
        const res: any = yield call(AppService.getCountDashboardData);
        if (res && res?.status== true &&res.statusCode == 200) {
            yield put({ type: types.DASHBOARD_COUNT_DATA_SUCCESS, payload: res.data });
        } else {
            yield put({ type: types.DASHBOARD_COUNT_DATA_SUCCESS, payload: {totalStudentCount:0, totalGuruCount:0} });
        }
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        console.log(error, 'error DELETE_GURU_SUCCESS*');
        yield put({ type: types.DASHBOARD_COUNT_DATA_SUCCESS, payload: {totalStudentCount:0, totalGuruCount:0} });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}


/**
 * @description onChangeSnackbarAction
 */
interface SnackbarProps {
    payload: 'warn' | 'success' | 'info' | 'error' | 'off' | 'clean' | false;
}

function* onChangeSnackbarAction({ payload }: SnackbarProps) {
    try {
        if (payload == 'warn') {
            yield put({ type: types.SET_SNACK_BAR_ACTION_WARNING, payload: true });
        }
        if (payload == 'success') {
            yield put({ type: types.SET_SNACK_BAR_ACTION_SUCCESS, payload: true });
        }
        if (payload == 'info') {
            yield put({ type: types.SET_SNACK_BAR_ACTION_INFO, payload: true });
        }
        if (payload == 'error') {
            yield put({ type: types.SET_SNACK_BAR_ACTION_ERROR, payload: true });
        }
        if (payload == 'off' || payload == 'clean' || payload == false) {
            yield put({ type: types.SET_SNACK_BAR_ACTION_OFF, payload: false });
        }
    } catch (error) {
        yield put({ type: types.SET_SNACK_BAR_ACTION_OFF, payload: false });
    }
}

/**
 *
 * @description Show Loading
 */
function* clearAllStateValue(): Generator<any, any, any> {
    try {
        yield put({ type: types.RESET_STATE_SUCCESS, payload: true });
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    } catch (error) {
        yield put({ type: types.SET_LOADING_SUCCESS, payload: false });
    }
}



export default function* AppSaga() {
    yield takeLatest(types.GET_STUDENT_LIST_REQUEST, getStudentsList);
    yield takeLatest(types.ADD_STUDENT_REQUEST, addNewStudent);
    yield takeLatest(types.REDIRECT_REQUEST, createRedirectRequest);
    yield takeLatest(types.SET_SELECTED_CLASS_REQUEST, setSelectedClass);
    yield takeLatest(types.ADD_NEW_CLASS_REQUEST, createNewClass);
    yield takeLatest(types.SET_SNACK_BAR_ACTION_REQUEST, onChangeSnackbarAction);
    yield takeLatest(types.SET_AUTH_REQUEST, setAuthRequest);
    yield takeLatest(types.RESET_STATE, clearAllStateValue);
    yield takeLatest(types.GET_GURU_LIST_REQUEST, getGuruList);
    yield takeLatest(types.GET_CLASS_LIST_REQUEST, getClassListByDate);
    yield takeLatest(types.GET_CLASS_LIST_BY_RANGE_REQUEST, getClassListByDateRange);
    yield takeLatest(types.GET_CLASS_ATTANDANCE_REQUEST, getAttandanceListBYClassSelect);
    yield takeLatest(types.SEARCH_STUDENTS_REQUEST, searchStudentByTermAndCheckAttandance);
    yield takeLatest(types.UPDATE_STUDENTS_ATTANDANCE_REQUEST, updateStudentAttandence);
    yield takeLatest(types.LOGOUT_USER_REQUEST, logoutUserRequest);
    yield takeLatest(types.GET_STUDENT_TIMELINE_REQUEST, getStudentTimelineListBySId);
    yield takeLatest(types.SEARCH_STUDENTS_BY_NN_REQUEST, searchStudentByNameAndMobile);
    yield takeLatest(types.ADD_NEW_GURU_REQUEST, addNewGuru);
    yield takeLatest(types.DELETE_GURU_REQUEST, deleteGuru);
    yield takeLatest(types.SET_LOADING_REQUEST, setLoadingRequest);
    yield takeLatest(types.SET_THEME_REQUEST, setThemeRequest);
    yield takeLatest(types.GET_CLASS_WITH_PAGINATION_REQUEST, getClassListByPagenationDateRange);
    yield takeLatest(types.DASHBOARD_COUNT_DATA_REQUEST, getCountDashboardData);
}


//      ADD_NEW_GURU_REQUEST: 'ADD_NEW_GURU_REQUEST',
//      ADD_NEW_GURU_SUCCESS: 'ADD_NEW_GURU_SUCCESS',

//      DELETE_GURU_REQUEST: 'DELETE_GURU_REQUEST',
//      DELETE_GURU_SUCCESS: 'DELETE_GURU_SUCCESS',