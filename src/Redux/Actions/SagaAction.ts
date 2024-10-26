import { types } from "../Types/SagaType";

/**
 * @description get the current autheticated user.
 */
export const getStudentList = (pagination:any) => ({
    type: types.GET_STUDENT_LIST_REQUEST,
    payload:pagination
});

/**
 * @description get the current autheticated user.
 */
export const addStudent = (payload:any) => ({
    type: types.ADD_STUDENT_REQUEST,
    payload:payload
});

/**
 * @description addNewClass
 */
export const addNewClass = (payload:any) => ({
    type: types.ADD_NEW_CLASS_REQUEST,
    payload:payload
});

/**
 * @description get the getQuestionnairesData.
 */
export const getGuruListData = () => ({
    type: types.GET_GURU_LIST_REQUEST,
    payload:null
});

/**
 * @description genrate dynamic deep link using firebase
 */
export const getClassListByDate = (payload:any) => ({
    type: types.GET_CLASS_LIST_REQUEST,
    payload:{date:payload}
});

/**
 * @description genrate dynamic deep link using firebase
 */
export const getClassListByDateRange = (payload:any) => ({
    type: types.GET_CLASS_LIST_BY_RANGE_REQUEST,
    payload
});

/**
 * @description genrate dynamic deep link using firebase
 */
export const setSelectedClass = (payload:any) => ({
    type: types.SET_SELECTED_CLASS_REQUEST,
    payload
});

/**
 * @description get Student List by Class
 */
export const getAttandanceListBYClassSelect = (payload:any) => ({
    type: types.GET_CLASS_ATTANDANCE_REQUEST,
    payload:{classId:payload}
});

/**
 * @description get Student List by Class
 */
type SearchTeamProps={
    term:string; classId?:string
}
export const searchStudentByNameAndMobile = (payload:SearchTeamProps) => ({
    type: types.SEARCH_STUDENTS_REQUEST,
    payload:payload
});

/**
 * @description get Student List by only Name and Number
 */
type SearchProps={
    term:string;
}
export const searchStudentByOnlyNameAndMobile = (payload:SearchProps) => ({
    type: types.SEARCH_STUDENTS_BY_NN_REQUEST,
    payload:payload
});

/**
 * @description POST UPDATE Attandance By Class
 */
export const updateAttandanceByClass = (payload:string) => ({
    type: types.UPDATE_STUDENTS_ATTANDANCE_REQUEST,
    payload:payload
});


/**
 * @description genrate dynamic deep link using firebase
 */
export const setAuthData = (payload:any) => ({
    type: types.SET_AUTH_REQUEST,
    payload:payload
});

/**
 * @description clean redirect to prop.
 */
export const cleanRedirect = () => ({
    type: types.REDIRECT_REQUEST,
    payload: null,
});

/**
 * @description logout user.
 */
export const authLogout = () => ({
    type: types.LOGOUT_USER_REQUEST,
});

/**
 * @description get Students Timeline By StudentId.
 */
export const getStudentsTimelineByStudentId = (payload:string) => ({
    type: types.GET_STUDENT_TIMELINE_REQUEST,
    payload
});

/**
 * @description get Class By pagination and date Range.
 */
export const getClassWithPaginationAndDate = (payload:string) => ({
    type: types.GET_CLASS_WITH_PAGINATION_REQUEST,
    payload
});

/**
 * @description get Students Timeline By StudentId.
 */
export const addNewGuru = (payload:any) => ({
    type: types.ADD_NEW_GURU_REQUEST,
    payload
});

/**
 * @description get Students Timeline By StudentId.
 */
export const deleteGuru = (payload:any) => ({
    type: types.DELETE_GURU_REQUEST,
    payload
});

/**
 * @description get Students Timeline By StudentId.
 */
export const setLoading = (payload:any) => ({
    type: types.SET_LOADING_REQUEST,
    payload
});

/**
 * @description set THEME.
 */
export const setTheme = (payload:any) => ({
    type: types.SET_THEME_REQUEST,
    payload
});

/**
 * @description get Students Timeline By StudentId.
 */
export const getCountDashboardData = () => ({
    type: types.DASHBOARD_COUNT_DATA_REQUEST,
    payload:null
});