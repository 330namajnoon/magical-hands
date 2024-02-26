import { createSlice } from "@reduxjs/toolkit";
import { decode } from "../Utils/createTokenBase";

export type UserInfo = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phoneNumber: string;
}

export type UserState = {
    loading: boolean;
    userInfo: UserInfo;
}

const initialState = {
    loading: false,
    userInfo: localStorage.getItem("user") ?  JSON.parse(decode(localStorage.getItem("user") as string)) : null
}

const userSile = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {

    }
})

export default userSile.reducer;