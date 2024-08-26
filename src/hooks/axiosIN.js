import axios from "axios"
import {BASE_URL} from "../env.js"

const axiosIN = axios.create();

axiosIN.defaults.baseURL = BASE_URL;
axiosIN.defaults.withCredentials = true;

export default axiosIN;