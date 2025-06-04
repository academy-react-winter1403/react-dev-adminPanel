import { createSlice } from "@reduxjs/toolkit";

export const technologiDataSlice = createSlice({
    name: "technologinDataSlice",

    initialState: {
        technologiData: null,
        tehcnologiSingelData: null
    },

    reducers: {
        addDataToTechnologiState: (state, action) => {
            state.technologiData = action.payload
        },
        addDataToTechnologiSingelState: (state, action) => {
            state.tehcnologiSingelData = action.payload
        }
    }
})

export default technologiDataSlice.reducer