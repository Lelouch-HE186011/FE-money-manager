export const BASE_URL = "http://localhost:8080/";
const CLOUDINARY_CLOUD_NAME = "dota7eyka"

export const API_ENDPOINTS = {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}

