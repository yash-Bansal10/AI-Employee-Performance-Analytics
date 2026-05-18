import axios from 'axios';

// Create an Axios instance pointing to the deployed backend
const API = axios.create({
    baseURL: 'https://ai-employee-performance-analytics.onrender.com',
});

// Intercept requests to add the JWT token to headers if it exists
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        if (parsedInfo.token) {
            req.headers.Authorization = `Bearer ${parsedInfo.token}`;
        }
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export default API;
