import axios from "axios";
import authService from "./authService";

export const DEV_MODE_URL = process.env["REACT_APP_DEV_MODE_URL "];
export const BASE_URL = process.env["REACT_APP_DEV_MODE_URL "];


export const $instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? DEV_MODE_URL : BASE_URL,
    withCredentials: true,
})

// interceptors for request
$instance.interceptors.request.use((config) => {
    const login_auth_token = localStorage.getItem('auth_token');
    if (login_auth_token) {
        config.headers.Authorization = `Bearer ${login_auth_token}`
    }
    return config
})


// interceptors for response
$instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const config = error?.config
        if (error?.response?.status === 401 && config?.url !== '/api/authenticate') {
            authService.logOut();
        }
    }
);
