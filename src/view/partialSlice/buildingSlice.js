import { createSlice } from "@reduxjs/toolkit";

export const buildingSlice = createSlice({
    name: "buildingSlice",

    initialState: {
        buildingData: null
    },

    reducers: {
        addDataToBuildingSlice: (state, action) => {
            state.buildingData = action.payload
        }
    }
})

export default buildingSlice.reducer