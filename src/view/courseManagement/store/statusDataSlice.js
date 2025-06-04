import { createSlice } from "@reduxjs/toolkit";

export const statusDataSlice = createSlice({
    name: "statusDataSlice",

    initialState: {
        statusData: null,
        statusSingelData: null
    },

    reducers: {
        addDataToStatusState: (state, action) => {
            state.statusData = action.payload
        },
        addDataToStatusSingelState: (state, action) => {
            state.statusSingelData = action.payload
        }
    }
})

export default statusDataSlice.reducer