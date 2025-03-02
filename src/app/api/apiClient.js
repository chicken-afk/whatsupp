import axios from 'axios';
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    method: 'get',
    baseURL: "http://103.139.193.55:8080/api/v1", // Replace with your API base URL
    // baseURL: "http://127.0.0.1:8080/api/v1", // Replace with your API base URL
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "x-api-key": "1234567890asdf", // Replace with your API key
    }
});

export const apiGet = async (url, params = {}) => {
    try {

        console.log("on hit apiGet", url);
        console.log("with token", Cookies.get('token'));
        const response = await apiClient.get(url, {
            params,
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        const statusCode = response.status;
        const responseBody = response.data;
        console.log("success hit apiGet", responseBody);
        return { statusCode, responseBody };
    } catch (error) {
        // Check if the error has a response (e.g., 422 or other HTTP error codes)
        if (error.response) {
            const statusCode = error.response.status;
            const responseBody = error.response.data;
            console.log("on catch if response", responseBody);
            // You can return the response body if needed, or throw the error for further handling
            // if (statusCode == 401) {
            //     return NextResponse.redirect(new URL('/', window.location.origin));
            // }
            return { statusCode, responseBody };
        } else {
            // Handle errors where there's no response (e.g., network issues)
            console.error('GET request error:', error);
            return { statusCode: 500, responseBody: { message: 'Internal Server Error' } };
        }
    }
};

export const apiPost = async (url, data) => {
    try {
        const response = await apiClient.post(url, data, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        const statusCode = response.status;
        const responseBody = response.data;
        console.log("success hit apiPost", responseBody);
        return { statusCode, responseBody };
    } catch (error) {
        // Check if the error has a response (e.g., 422 or other HTTP error codes)
        if (error.response) {
            const statusCode = error.response.status;
            const responseBody = error.response.data;
            console.log("on catch if response", responseBody);
            console.log("on catch if status", statusCode);
            // You can return the response body if needed, or throw the error for further handling
            // if (statusCode == 401) {
            //     return NextResponse.redirect(new URL('/', window.location.origin));
            // }
            return { statusCode, responseBody };
        } else {
            // Handle errors where there's no response (e.g., network issues)
            console.error('POST request error:', error);
            return { statusCode: 500, responseBody: { message: 'Internal Server Error' } };
        }
    }
};


export const apiPut = async (url, data) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        console.error('PUT request error:', error);
        throw error;
    }
};

export const apiDelete = async (url) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        console.error('DELETE request error:', error);
        throw error;
    }
};

export const apiPatch = async (url, data) => {
    try {
        const response = await apiClient.patch(url, data);
        return response.data;
    } catch (error) {
        console.error('PATCH request error:', error);
        throw error;
    }
};