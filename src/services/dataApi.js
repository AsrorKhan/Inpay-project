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
    console.log("token_expires_in", token_expires_in);
    if (endDate * 1000 < Date.now()) {
        authService.logOut();
    }
    if (login_auth_token) {
        config.headers.Authorization = `Bearer ${login_auth_token}`
    }




    return config
})
