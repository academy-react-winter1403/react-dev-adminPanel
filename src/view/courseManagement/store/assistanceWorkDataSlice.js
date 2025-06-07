import { createSlice } from "@reduxjs/toolkit";

export const assistanceWorkDataSlice = createSlice({
    name: "assistanceWorkDataSlice",

    initialState: {
        assistanceWorkData: null,
        assistanceWorkDataSingelData: null
    },

    reducers: {
        addDataToAssistanceWorkState: (state, action) => {
            state.assistanceWorkData = action.payload
        },
        addDataToAssistanceWorkSingrlState: (state, action) => {
            state.assistanceWorkDataSingelData = action.payload
        }
    }
})

export default assistanceWorkDataSlice.reducer