import { createSlice } from "@reduxjs/toolkit";

export const workDataSlice = createSlice({
    name: "workDataSlice",

    initialState: {
        workData: null,
        workSingelData: null
    },

    reducers: {
        addDataToWorkState: (state, action) => {
            state.workData = action.payload
        },
        addDataToWorkSingelData: (state, action) => {
            state.workSingelData = action.payload
        }
    }
})

export default workDataSlice.reducer