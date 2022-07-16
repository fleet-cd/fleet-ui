import axios from 'axios';

export const http = axios.create({
    withCredentials: true
});

// intercept 401 InvalidToken:UNAUTHORIZED
http.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        if (error.response.data.errorName === 'InvalidToken:UNAUTHORIZED') {
            window.location.pathname = '/login';
        }
    }
    return error;
});