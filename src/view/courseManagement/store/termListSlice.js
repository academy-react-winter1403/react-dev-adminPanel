import { createSlice } from "@reduxjs/toolkit";

export const termListSlice = createSlice({
    name: "termListSlice",

    initialState: {
        termList: null
    },

    reducers: {
        addDataToTermList: (state, action) => {
            state.termList = action.payload
        }
    }
})

export default termListSlice.reducer