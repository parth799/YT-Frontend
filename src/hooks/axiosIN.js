import axios from "axios"
import {BASE_URL} from "../env.js"

const axiosIN = axios.create();
const token = localStorage.getItem("token");

axiosIN.defaults.baseURL = BASE_URL;
// axiosIN.defaults.withCredentials = true;
axiosIN.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export default axiosIN;