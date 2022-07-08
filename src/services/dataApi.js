import axios from "axios";
import {useNavigate} from "react-router-dom";
import authService from "./authService";

export const BASE_URL = 'http://192.168.163.156:8080';


export const $instance = axios.create({
    baseURL: process.env.NODE_ENV ==='development' ? '' : BASE_URL,
    // baseURL: "",
    withCredentials: true,
})


$instance.interceptors.request.use((config) => {
    const login_auth_token = localStorage.getItem('auth_token');
    const token_expires_in = localStorage.getItem('token_expires_in');
    const endDate = new Date(`${token_expires_in}`).getTime();

    if (endDate * 1000 < Date.now()) {
        authService.logOut();
    }
    if (login_auth_token) {
        config.headers.Authorization = `Bearer ${login_auth_token}`
    }
    return config
})

$instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/auth/login' && err.response) {
            if (err.response.status === 401) {
                authService.logout();
            }
        }

        return Promise.reject(err);
    }
);
