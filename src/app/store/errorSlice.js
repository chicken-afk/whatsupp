import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: {
        emailAlert: "",
    },
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setEmailAlert: (state, action) => {
            state.error.emailAlert = action.payload;
        },
        resetState: (state) => {
            state.error.emailAlert = null;
        },
    },
});

export const { setEmailAlert, resetState } = errorSlice.actions;
export default errorSlice.reducer;
