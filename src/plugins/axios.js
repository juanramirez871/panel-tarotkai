import axios from 'axios';
import { router } from '../shared/routes/index';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = false;

axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return request;
});

axios.interceptors.response.use(response => response, error => {
    const { status, data } = error.response;
    if (status >= 500) console.error(error);
    if (status === 400) throw data;
    if (status === 401) {
        localStorage.removeItem("token")
        router.push({ name: 'login' });
    }
    if (status === 403) {
        router.push({ name: 'unauthorized' });
    }
    return Promise.reject(error);
});
