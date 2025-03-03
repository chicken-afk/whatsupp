import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ActiveRoomId: null,
    ActiveRoomEmail: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setActiveRoomId: (state, action) => {
            console.log("roomId active " + action.payload)
            state.ActiveRoomId = action.payload;
        },
        resetState: (state) => {
            state.ActiveRoomEmail = null;
            state.ActiveRoomId = null;
        },
        setActiveRoomEmail: (state, action) => {
            console.log("email active " + action.payload)
            state.ActiveRoomEmail = action.payload;
        }
    },
});

export const { setActiveRoomId, resetState, setActiveRoomEmail } = roomSlice.actions;
export default roomSlice.reducer;