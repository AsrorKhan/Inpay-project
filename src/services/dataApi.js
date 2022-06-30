import axios from "axios";

const BASE_URL = 'http://192.168.163.156:8080';


export const $instance = axios.create({
    baseURL: process.env.NODE_ENV ==='development' ? '' : BASE_URL,
    withCredentials: true,
})


$instance.interceptors.request.use((config) => {
    const login_auth_token = localStorage.getItem('auth_token');
    if (login_auth_token) {
        config.headers.Authorization = `Bearer ${login_auth_token}`
    }
    return config
})
