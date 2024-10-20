import ApiFetch from "../Helpers/FetchApi";
import API from './../Helpers/Constant';
class AuthService {
    app: any = null;
    realm: any = null;
    users: any = null;

    constructor() {
    }


    async setAuthData(value: any) {
        try {
            await localStorage.setItem(`${process.env.REACT_APP_STORAGE_KEY}/auth`, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    };

    async setAuthToken(token: any) {
        try {
            await localStorage.setItem(`${process.env.REACT_APP_STORAGE_KEY}/token`, `${token}`);
            return true;
        } catch (e) {
            return false;
        }
    };

    async getAuthData() {
        try {
            return JSON.parse(localStorage.getItem(`${process.env.REACT_APP_STORAGE_KEY}/auth`) || '{}');
        } catch (e) {
            return null;
        }
    };


    async logout() {
        try {
            return await localStorage.removeItem(`${process.env.STORAGE_KEY}/auth`);
        } catch (e) {
            return null;
        }
    };

    /**@SIGN_UP */
    async signUp(email: string, password: string) {
        try {
            const result = await this.app.emailPasswordAuth.registerUser({ email, password });
            if (result) {
                return { status: true, message: "User registered successfully!" };
            } else {
                return { status: false, message: "User registration failed!" };
            }
        } catch (error: any) {
            return { status: false, message: error.message };
        }
    };

    /**@SIGN_IN */
    async signIn(email: string, password: string) {
        try {
            const obj = {
                email: email,
                password: password
            }
            return await ApiFetch.fetchPost(`/${API.login}`, JSON.stringify(obj))
        } catch (error: any) {
            return { status: false, error, message: "Invalid email or password" };
        }
    };


     /**@SIGN_IN */
    async test() {
        let url='https://krishna-classes.onrender.com';
        try {
            return fetch(url) // Replace with your machine's IP address
            .then(response => response.json())
            .then(data => console.log('Response from server:', data))
            .catch(error => console.error('Network request failed:', error));
        } catch (error: any) {
            return { status: false, error,url, message: "Invalid email or password" };
        }
    };

    /**@DELAY_FUNCTION */
    async delay(time: number) {
        return new Promise((resolve: any) => setTimeout(() => resolve(true), time));
    };
}
export default new AuthService();