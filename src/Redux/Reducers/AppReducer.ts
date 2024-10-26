// import { Alert } from "react-native";
import { types } from "../Types/SagaType";
import {ActionProps, InitialStateProps} from './Models/Reducers.Model';
const STORAGE_KEY=process.env.REACT_APP_STORAGE_KEY;

const INITIAL_STATE:InitialStateProps = {
    error: '',
    redirect: '',
    isLoading: false,
    studentList: [],
    selectedClass: {_id:"", className:"", description:"", startDateTime:new Date(), endDateTime:new Date()},
    authData: {_id:'',fullName:"",firstName:'', lastName:'', email:'', admin:false, token:''},
    guruList:[],
    classListByDate:[],
    attandanceListOfClass:[],
    searchStudentList:[],
    studentTimelineList:[],
    selectedTheme:'',
    totalStudentCount:0,
    totalClassCount:0,
    countDashboardData:{
        totalStudentCount:0,
        totalGuruCount:0
    }
};

const AppReducer = (state:InitialStateProps = INITIAL_STATE, action:ActionProps) => {
    switch (action.type) {
        case types.SET_LOADING_SUCCESS:
            return {
                ...state,
                isLoading: action.payload,
            };

        case types.REDIRECT_SUCCESS:
            return {
                ...state,
                redirect: action.payload,
                error: null,
            };

        case types.SET_TOTAL_STUDENT_COUNT:
            return {
                ...state,
                totalStudentCount:action.payload,
                error: null,
            };

        case types.GET_STUDENT_LIST_SUCCESS:
            return {
                ...state,
                studentList:action.payload.reverse(),
                error: null,
            };
            
        case types.GET_STUDENT_LIST_FAILURE:
            return {
                ...state,
                studentList:action.payload.reverse(),
                error: null,
            };

        case types.ADD_STUDENT_SUCCESS:
            return {
                ...state,
                studentList: [action.payload, ...state.studentList],
                redirect:'back',
                error: null,
            };

        case types.ADD_STUDENT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case types.GET_GURU_LIST_SUCCESS:
            return {
                ...state,
                guruList:action.payload,
                error: null,
            };
        case types.GET_GURU_LIST_FAILURE:
            return {
                ...state,
                guruList:action.payload,
                error: null,
            };
        case types.ADD_NEW_GURU_SUCCESS:
            return {
                ...state,
                guruList:[...state.guruList, action.payload],
                error: null,
            };
        case types.DELETE_GURU_SUCCESS:
            return {
                ...state,
                guruList:action.payload,
                error: null,
            };

        case types.SET_TOTAL_CLASS_COUNT:
            return {
                ...state,
                totalClassCount:action.payload,
                error: null,
            };

        case types.GET_CLASS_LIST_BY_RANGE_SUCCESS:
        case types.GET_CLASS_LIST_SUCCESS:
            return {
                ...state,
                classListByDate:action.payload,
                error: null,
            };
        case types.GET_CLASS_LIST_BY_RANGE_FAILURE:
        case types.GET_CLASS_LIST_FAILURE:
            return {
                ...state,
                classListByDate:action.payload,
                error: null,
            };

        case types.GET_CLASS_ATTANDANCE_SUCCESS:
            return {
                ...state,
                attandanceListOfClass:action.payload,
                error: null,
            };
        case types.GET_CLASS_ATTANDANCE_FAILURE:
            return {
                ...state,
                attandanceListOfClass:action.payload,
                error: null,
            };

        case types.ADD_NEW_CLASS_SUCCESS:
            return {
                ...state,
                error: null,
                classListByDate: [
                    ...state.classListByDate,
                    { ...action.payload } // Create a new object to avoid mutation
                ]
            };

        case types.SET_SELECTED_CLASS_SUCCESS:
            return {
                ...state,
                selectedClass:action.payload,
                error: null,
            };

        case types.SEARCH_STUDENTS_SUCCESS:
            return {
                ...state,
                searchStudentList:action.payload,
                error: null,
            };
        
        case types.SEARCH_STUDENTS_FAILURE:
            return {
                ...state,
                searchStudentList:action.payload,
                error: null,
            };

        case types.SEARCH_STUDENTS_BY_NN_FAILURE:
        case types.SEARCH_STUDENTS_BY_NN_SUCCESS:
            return {
                ...state,
                searchStudentList:action.payload,
                error: null,
            };


        case types.UPDATE_STUDENTS_ATTANDANCE_SUCCESS:
            console.log(action.payload, 'action.payload @@');
            
            return {
                ...state,
                attandanceListOfClass:action.payload,
                error: null,
            };
        
        case types.UPDATE_STUDENTS_ATTANDANCE_FAILURE:
            return {
                ...state,
                // attandanceListOfClass:action.payload,
                error: null
            };
        
        case types.GET_STUDENT_TIMELINE_SUCCESS:
            return {
                ...state,
                studentTimelineList:action.payload.reverse(),
                error: null
            };

        case types.SET_AUTH_SUCCESS:
            return {
                ...state,
                authData:action.payload,
                error: null,
            };

        case types.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                redirect:'SignInScreen',
                authData:{_id:'',firstName:'', lastName:'', email:'', admin:false, token:''},
                error: null,
            };

        case types.SET_THEME_SUCCESS:
            console.log(action.payload, 'action.payload');
            
            return {
                ...state,
                selectedTheme:action.payload,
            };


        case types.DASHBOARD_COUNT_DATA_SUCCESS:
            return {
                ...state,
                countDashboardData:action.payload,
                error: null,
            };

        // case types.UPDATE_ENTERPRISE_SUCCESS:

        //     return {
        //         ...state,
        //         selectedQuestion: {
        //             ...state.selectedQuestion,
        //             questions: state.selectedQuestion.questions.map((question, index) => 
        //               index === action.payload.index ? { ...question, ...action.payload.data } : question
        //             ),
        //         },
        //         questionArrayList: state.questionArrayList.map(item => {
        //             return {
        //               ...item,
        //               files: item.files.map((file:any) => {
        //                 return {
        //                   ...file,
        //                   questions: file.questions.map((question:FileQuestionModels) => 
        //                     question._id === action.payload.questionId ? { ...question, ...action.payload.data } : question
        //                   )
        //                 };
        //               })
        //             };
        //         }),
        //         error: null,
        //     };

        case types.REDIRECT_REQUEST:
            return {
                ...state,
                redirect: action.payload,
                error: null,
            };

        default:
            
        return state;
    }
};

export default AppReducer;