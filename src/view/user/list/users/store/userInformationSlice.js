import { createSlice } from "@reduxjs/toolkit";

export const userInformationSlice = createSlice({
    name: "userInfoData",

    initialState: {
        userInfoData: null
    },

    reducers: {
        addUserInfoData: (state, action) => {
            state.userInfoData = action.payload
        }
    }
})

export default userInformationSlice.reducer