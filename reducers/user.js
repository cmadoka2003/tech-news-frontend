import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        token: null,
        username: ""
    },
};

export const userSlide = createSlice({
    name: "user",

    initialState,
    reducers: {
        Login: (state, action) => {
            state.value.token = action.payload.token
            state.value.username = action.payload.username
            console.log(state.value.username);
        },
        Logout: (state) => {
            state.value.token = null
            state.value.username = "";
        }
    }
})

export const { Login, Logout } = userSlide.actions
export default userSlide.reducer