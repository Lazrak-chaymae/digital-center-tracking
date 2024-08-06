import axios from "axios";

const AUTH_REST_API_URL = 'http://localhost:8765/api/auth';

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_URL + '/register', registerObj);

export const loginAPICall = (email, password) => axios.post(AUTH_REST_API_URL + '/login', { email, password });

export const listRoles = () => axios.get(AUTH_REST_API_URL + '/roles');

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");
 

export const saveLoggedInUser = (email, role, password, name) => {
    sessionStorage.setItem("authenticatedUser", email);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("name", name);
};

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    if (role != null && role === 'DeleveryManager') {
        return true;
    }
    else {
        return false;
    }
}

export const isUserLoggedIn = () => {
    const email = sessionStorage.getItem("authenticatedUser");
    if (email == null) {
        return false;
    }
    else {
        return true;
    }
}

export const getLoggedInUser = () => {
    const email = sessionStorage.getItem("authenticatedUser");
    return email;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}
