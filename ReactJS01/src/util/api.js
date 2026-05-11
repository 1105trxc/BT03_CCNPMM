import axios from './axios.customize';

export const createUserApi = (name, email, password) => {
    return axios.post("/v1/api/register", { name, email, password });
};

export const loginApi = (email, password) => {
    return axios.post("/v1/api/login", { email, password });
};

export const forgotPasswordApi = (email) => {
    return axios.post("/v1/api/forgot-password", { email });
};

export const resetPasswordApi = (token, newPassword) => {
    return axios.post("/v1/api/reset-password", { token, newPassword });
};

export const getUserApi = () => {
    return axios.get("/v1/api/user");
};

export const getAccountApi = () => {
    return axios.get("/v1/api/account");
};
