"use client";

import { useSelector, useDispatch } from 'react-redux';
import { setEmailAlert } from '../store/errorSlice';
import { setProfile, setLoginState } from '../store/authSlice';
import { apiPost } from './apiClient';

export const handleRegister = async () => { // Marking the function as async
    const dispatch = useDispatch();
    try {
        const response = await apiPost("/register", {  // Using await here is now valid
            email: email,
            password: password
        });

        // Check if the response object contains statusCode and responseBody
        if (response) {
            const { statusCode, responseBody } = response;
            if (statusCode === 200) {
                const data = responseBody.data;
                const loginToken = data.token.accessToken;
                const loginRefreshToken = data.token.refreshToken;
                const loginProfile = {
                    uuid: data.uuid,
                    email: data.email,
                };
                //set profile to redux
                dispatch(setProfile(loginProfile));
                dispatch(setLoginState(true));
                //set token to local storage
                localStorage.setItem("token", loginToken);
                localStorage.setItem("refreshToken", loginRefreshToken);
                // router.push("/roomchat");
            } else {
                dispatch(setEmailAlert(responseBody.message));
            }
        }
        return
    }
    catch (err) {
        console.error("Post error:", err);
        alert("Internal Server Error");
    }
};