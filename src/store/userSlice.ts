import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "src/store";

export interface userState {
    userName: string | null;
    userEmail: string | null;
}

const initialState: userState = {
    userName: null,
    userEmail: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setActiveUser: (state, {payload}) => {
            state.userName = payload.userName;
            state.userEmail = payload.userEmail;
        },
        setUserLogOut: (state) => {
            state.userName = null;
            state.userEmail = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const {setActiveUser, setUserLogOut} = userSlice.actions;
export const userValue = (state: RootState) => state.user;
export default userSlice.reducer;
