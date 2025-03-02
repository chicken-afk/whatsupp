"use client";

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomReducer from './roomSlice';
import errorReducer from './errorSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer
    },
});

export default store;
