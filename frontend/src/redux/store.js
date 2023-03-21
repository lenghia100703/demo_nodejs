import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import useReducer from './userSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: useReducer,
    },
});
