import jwt from "jwt-decode";

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('token')) {
        const decoded = jwt(localStorage.getItem('token'));
        return (decoded['id'] !== undefined && decoded['is_admin'] !== undefined ? localStorage.getItem('token') : false);
    } else {
        return false;
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        return isAuthenticated() ? next() : localStorage.clear();
    }
}

export const isAdmin = () => {
    if (localStorage.getItem('token')) {
        const decoded = jwt(localStorage.getItem('token'));
        return decoded.is_admin;
    }
    return false;
}

export const getUserId = () => {
    if (localStorage.getItem('token')) {
        const decoded = jwt(localStorage.getItem('token'));
        return decoded.id;
    }
}

export const getToken = () => {
    return localStorage.getItem('token') ? localStorage.getItem('token') : null;
}