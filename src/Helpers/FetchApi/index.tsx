const STORAGE_KEY = process.env.STORAGE_KEY;
// const URI:string=`https://krishna-classes.onrender.com/api/v1.0`;
// const URI:string=`http://10.0.2.2:3200/api/v1.0`;
const URI:string=`http://localhost:3200/api/v1.0`;

export const getHeader = async (url: string) => {
    let baseHeaders: { [key: string]: string | null } = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
    };
    let token = localStorage.getItem(`${STORAGE_KEY}/token`);
    if (token) {
        baseHeaders['Authorization'] = `Bearer ${token}`;
    }
    return baseHeaders;
};

// ${url}${headers?.token ? '?access_token=' + headers?.token : ''}
const ApiFetch = {
    // For Api get use this
    fetchGet: async function (url: any) {
        const headers: any = await getHeader(url);
        const option: any = { method: 'GET', headers: headers };
        const response = await fetch(`${URI}/${url}`, option);
        const statusCode = response.status;
        const data = await response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            ...res[1]
        }));
    },

    // for Api Post use this
    fetchPost: async function (url: any, body: any) {
        console.log(`${URI}${url}`, 'body=>', body);
        const headers: any = await getHeader(url);
        const option: any = { method: 'POST', headers: headers, body: body };
        const response = await fetch(`${URI}${url}`, option);
        const statusCode = response.status;
        console.log(`${URI}${url}`, 'API_NAME, statusCode',statusCode, 'final-res=>', JSON.stringify(response) );
        const data = await response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            ...res[1]
        }));
    },
    fetchPut: async function (url: string, body: any) {
        const headers: any = await getHeader(url);
        const option: any = { method: 'PUT', headers: headers, body: body };
        const response = await fetch(`${URI}/${url}`, option);
        const statusCode = response.status;
        const data = await response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            ...res[1]
        }));
    },

    fetchDelete: async function (url: string, body: any) {
        const headers: any = await getHeader(url);
        return fetch(`${URI}/${url}`, {
            method: 'DELETE',
            headers: headers,
            body: body,
        }).then(response => {
            return response.json()
        }).then(responseJson => {
            return responseJson;
        }).catch(error => {
        });
    },
    // for Api Post use this
    fetchFormDataPost: async function (url: any, body: any) {
        const strToken: any = localStorage.getItem(`${STORAGE_KEY}/token`);
        let headers = {
            'Content-Type': 'multipart/form-data',// this is a imp line
            'Authorization': strToken,
            Accept: 'application/json',
        };
        const option: any = { method: 'POST', headers: headers, body: body };
        const response = await fetch(`${URI}/${url}`, option);
        const statusCode = response.status;
        const data = await response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            ...res[1]
        }));
    }
};
export default ApiFetch;