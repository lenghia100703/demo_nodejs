import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:8000/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());

    try {
        await axios.post('http://localhost:8000/v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get('http://localhost:8000/v1/user', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed());
    }
};

export const logoutUser = async (id, accessToken, dispatch, navigate, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('http://localhost:8000/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};

export const deleteUser = async (id, accessToken, dispatch, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete('http://localhost:8000/v1/user/' + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailed(err.response.data));
    }
};
