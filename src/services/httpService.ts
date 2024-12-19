import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// Set the base URL for all Axios requests
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

// Axios response interceptor to handle errors globally
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) return Promise.reject(error);

        const axiosError = error as AxiosError;
        const isExpectedError = axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500;
        if (!isExpectedError) toast.error('An unexpected error occurred.');

        // Always reject the promise for further error handling in the caller
        return Promise.reject(error);
    }
);

/**
 * Sets the JWT token in Axios headers for authentication.
 * @param {string | null} jwt - The JSON Web Token or null to remove it.
 */
function setJwt(jwt: string | null): void {
    if (jwt) {
        axios.defaults.headers.common['x-auth-token'] = jwt;
    } else {
        delete axios.defaults.headers.common['x-auth-token']; // Remove the token if null
    }
}

/**
 * Generic function to handle HTTP GET requests.
 * @param url - The endpoint URL.
 * @param config - Optional AxiosRequestConfig object for additional configurations.
 * @returns A promise resolving to AxiosResponse with inferred response data type.
 */
function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.get<T>(url, config);
}

/**
 * Generic function to handle HTTP POST requests.
 * @param url - The endpoint URL.
 * @param data - The data to send in the body of the request.
 * @param config - Optional AxiosRequestConfig object for additional configurations.
 * @returns A promise resolving to AxiosResponse with inferred response data type.
 */
function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.post<T>(url, data, config);
}

/**
 * Generic function to handle HTTP PUT requests.
 * @param url - The endpoint URL.
 * @param data - The data to send in the body of the request.
 * @param config - Optional AxiosRequestConfig object for additional configurations.
 * @returns A promise resolving to AxiosResponse with inferred response data type.
 */
function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.put<T>(url, data, config);
}

/**
 * Generic function to handle HTTP PATCH requests.
 * @param url - The endpoint URL.
 * @param data - The data to send in the body of the request.
 * @param config - Optional AxiosRequestConfig object for additional configurations.
 * @returns A promise resolving to AxiosResponse with inferred response data type.
 */
function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.patch<T>(url, data, config);
}

/**
 * Generic function to handle HTTP DELETE requests.
 * @param url - The endpoint URL.
 * @param config - Optional AxiosRequestConfig object for additional configurations.
 * @returns A promise resolving to AxiosResponse with inferred response data type.
 */
function del<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios.delete<T>(url, config);
}

// Export the HTTP service as a clean, reusable API
const httpService = {
    get,
    post,
    put,
    patch,
    delete: del,
    setJwt
};

export default httpService;
