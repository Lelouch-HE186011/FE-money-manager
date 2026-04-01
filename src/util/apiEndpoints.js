export const BASE_URL = "http://localhost:8080";
const CLOUDINARY_CLOUD_NAME = "dota7eyka"

export const API_ENDPOINTS = {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    GET_USER_INFO: "auth/account",
    REGISTER: "/register",
    GET_ALL_CATEGORIES: "/categories",
    UPDATE_CATEGORIES: (categoryId) => `/categories/${categoryId}`,
    ADD_CATEGORY: "/categories",
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (id) => `/incomes/${id}`,
    INCOME_EXCEL_DOWNLOAD: "excel/download/incomes",
    EMAIL_INCOME: "/email/income-excel",
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (id) => `/expenses/${id}`,
    EXPENSE_EXCEL_DOWNLOAD: "excel/download/expenses",
    EMAIL_EXPENSE: "/email/expense-excel",
    APPLY_FILTER: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}

