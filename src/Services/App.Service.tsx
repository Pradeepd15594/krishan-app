import API from "./../Helpers/Constant";
import ApiFetch from "./../Helpers/FetchApi";

class AppService {
    constructor() {

    }

    async addStudent(formData: any) {
        return await ApiFetch.fetchPost(`/${API.addNewStudent}`, JSON.stringify(formData))
    };

    async getStudents(pagination:any) {
        try {
            let query='';
            if(pagination && pagination.pageNo>-1 && pagination.perPage){
                query=`?pageNo=${(pagination.pageNo + 1)}&perPage=${pagination.perPage}`;
            }
            return await ApiFetch.fetchGet(`/${API.getStudent}${query}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async addNewClass(formData:any) {
        try {
            return await ApiFetch.fetchPost(`/${API.addNewClassAPI}`, JSON.stringify(formData))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async getGuruList() {
        try {
            return await ApiFetch.fetchGet(`/${API.getGuruList}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };


    async getClassListByDate(reqBody:any) {
        try {
            return await ApiFetch.fetchPost(`/${API.getClassByDate}`, JSON.stringify(reqBody))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async getClassByDateRange(reqBody:any) {
        try {
            return await ApiFetch.fetchPost(`/${API.getClassByDateRange}`, JSON.stringify(reqBody))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async getAttandanceListBYClassId(classId:string) {
        try {
            return await ApiFetch.fetchGet(`/${API.getAttandanceList}?classId=${classId}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async searchStudentByName(name:string) {
        try {
            return await ApiFetch.fetchGet(`/${API.searchStudent}?name=${name}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async searchStudentAndCheckStudentPresentInClass(reqObj:any) {
        let q:string=`?name=${reqObj.term}`;
        if(reqObj?.classId){q=`${q}&classId=${reqObj.classId}`}
        try {
            return await ApiFetch.fetchGet(`/${API.searchStudentAndCheckAttandance}${q}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async searchStudentByNameAndMobile(reqObj:any) {
        let q:string=`?name=${reqObj.term}`;
        try {
            return await ApiFetch.fetchGet(`/${API.searchStudentByNameAndMobile}${q}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async updateAttandanceByClass(reqBody:any) {
        try {
            return await ApiFetch.fetchPost(`/${API.updateAttandanceByClassApi}`, JSON.stringify(reqBody))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async getStudentsTimelineByStudentId(studentId:string) {
        try {
            return await ApiFetch.fetchGet(`/${API.getStudentsTimeline}${studentId}`)
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async addNewGuru(data:any) {
        try {
            return await ApiFetch.fetchPost(`/${API.addNewGuru}`, JSON.stringify(data))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };

    async deleteNewGuru(id:string) {
        try {
            return await ApiFetch.fetchPut(`/${API.deleteUserList}${id}`, JSON.stringify({}))
        } catch (error: any) {
            return { status: false, message: "no data found" };
        }
    };
}
export default new AppService();