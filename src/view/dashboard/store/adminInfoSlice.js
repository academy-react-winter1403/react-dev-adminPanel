import { createSlice } from "@reduxjs/toolkit";

export const adminInfoSlice = createSlice({
    name: "adminInformation",

    initialState: {
        adminInfoState: null
    },

    reducers: {
        addDataTheAdminInfoState: (state, action) => {
            state.adminInfoState = action.payload
        }
    }
})

export default adminInfoSlice.reducer