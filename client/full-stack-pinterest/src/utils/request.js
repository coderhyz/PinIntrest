import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 5000,
    withCredentials: true, // 允许携带cookie
});
export default request;