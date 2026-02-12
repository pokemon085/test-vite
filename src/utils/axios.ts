import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpRequest {
    private readonly baseUrl: string;
    constructor() {
        this.baseUrl = import.meta.env.VITE_BASE || '';
    }

    getInsideConfig() {
        return {
            baseURL: this.baseUrl,
            headers: {},
        };
    }

    interceptors(instance: AxiosInstance) {
        instance.interceptors.request.use(
            (config) => config,
            (error) => Promise.reject(error),
        );

        instance.interceptors.response.use(
            (res) => res.data,
            (error) => Promise.reject(error),
        );
    }

    request(options: AxiosRequestConfig) {
        const instance = axios.create();
        options = { ...this.getInsideConfig(), ...options };
        this.interceptors(instance);
        return instance(options);
    }
}

const http = new HttpRequest();
export default http;
