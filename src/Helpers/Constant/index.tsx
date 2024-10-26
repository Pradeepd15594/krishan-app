const API={
    /**@AUTH */
    login: `render-server/login`,

    /**@STUDENTS */
    getStudent: `render-server/get-student`,
    addNewStudent: `render-server/signUpStudent`,
    updateStudent: `render-server/updateStudent/${''}`,
    addNewClassAPI: `render-server/create-class`,
    getGuruList: `render-server/get-guru-list`,
    getClassByDate: `render-server/get-class-by-date`,
    getClassByDateRange: `render-server/get-class-by-date-range`,
    getAttandanceList: `render-server/get-attandance-list`,
    searchStudent: `render-server/search-student`,
    updateAttandanceByClassApi: `render-server/update-attandance-by-class`,
    searchStudentAndCheckAttandance: `render-server/search-student-by-term`,
    searchStudentByNameAndMobile: `render-server/search-student-by-name-and-mobile`,
    getStudentsTimeline: `render-server/get-students-timeline/${''}`,
    addNewGuru: `render-server/add-new-guru`,
    deleteUserList: `render-server/delete-guru/${''}`,
    getClassByPagenationDateRange: `render-server/get-class-list-by-pagenation-date-range`,
    countDashboardData: `render-server/count-dashboard-data`,
    
}

export default API;