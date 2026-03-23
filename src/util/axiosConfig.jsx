import axios from "axios";
import { BASE_URL } from "../util/apiEndpoints.js";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

const excludeEndpints = ["/auth/login", "/register", "/status", "/activate", "/health"];

axiosConfig.interceptors.request.use(config => {
    const shouldSkipToken = excludeEndpints.some((endpoint) =>
        config.url?.includes(endpoint)
    )

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            const isAuthEndpoint = excludeEndpints.some(ep => error.config.url?.includes(ep));
            if (!isAuthEndpoint) {
                window.location.href = "/login";
            }

        } else if (error.response.status === 500) {
            console.error("Server error. Please try again");
        }
    } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again");
    }
    return Promise.reject(error);
});

export default axiosConfig;

