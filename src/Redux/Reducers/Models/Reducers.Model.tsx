export interface ActionProps{
    type:string;
    payload:any;
}

export interface InitialStateProps{
    error: string,
    redirect: string,
    isLoading: false,
    studentList: any[],
    selectedClass: ClassListModel,
    authData: AuthDataModels,
    guruList:GuruListModel[]
    classListByDate:ClassListModel[]
    attandanceListOfClass:AttandanceListOfClassModel[]
    searchStudentList:any[],
    studentTimelineList:StudentTimelineModel[],
    selectedTheme:string;
    totalStudentCount:number;
    totalClassCount:number;
    countDashboardData:CountDashboardDataModel
}

export interface File {
    fileName: string;
    _id:      string;
}

export interface GuruListModel {
    name: string;
    _id:  string;
}

export interface ClassListModel {
    _id:  string;
    className: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    isClassCanceled?: boolean;
}

export interface AttandanceListOfClassModel {
    _id:  string;
    classId: string;
    name: string;
    studentId: string;
    email: string;
    mobile: string;
    address:string;
}

export interface AuthDataModels {
    _id:        string;
    fullName?:  string;
    firstName?:  string;
    lastName?:   string;
    email:      string;
    password?:   string;
    dbName?:     string;
    status?:     boolean;
    admin?:      boolean;
    createdAt?:  Date;
    updatedAt?:  Date;
    token?:      string;
    otp?:        string;
    otpExpires?: Date;
}

export interface StudentTimelineModel{
    studentId: string;
    month:     number;
    year:      number;
    classes:   Class[];
}

export interface Class {
    className:     string;
    description:   string;
    guruName:      string;
    startDateTime: Date;
    endDateTime:   Date;
}

export interface CountDashboardDataModel {
    totalStudentCount:number,
    totalGuruCount:number
}