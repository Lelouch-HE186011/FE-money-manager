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
        const accessToken = localStorage.getItem("accessToken");
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
}, async (error) => {
    const originalRequest = error.config;

    if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
            const isAuthEndpoint = excludeEndpints.some(ep => originalRequest.url?.includes(ep));
            
            if (!isAuthEndpoint && !originalRequest.url?.includes('/auth/refresh-with-cookie')) {
                originalRequest._retry = true;
                
                try {
                    // Call the refresh token endpoint
                    // We use standalone axios to prevent interceptor loops
                    const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-with-cookie`, {}, {
                        withCredentials: true
                    });
                    
                    if (refreshResponse.status === 200) {
                        const newAccessToken = refreshResponse.data.data.accessToken;
                        localStorage.setItem("accessToken", newAccessToken);
                        
                        // Retry the original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosConfig(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh token failed, clear storage and go to login
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            } else if (!isAuthEndpoint) {
                // If it's not an auth endpoint but retry already happened or refresh failed
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