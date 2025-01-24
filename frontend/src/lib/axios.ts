import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { status, data } = error.response;
        return Promise.reject({ status, ...data });
    }
);
