import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    isLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginState: (state, action) => {
            state.isLogin = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        resetState: (state) => {
            state.profile = null;
            state.isLogin = false;
        },
    },
});

export const { setLoginState, setProfile, resetState } = authSlice.actions;
export default authSlice.reducer;
