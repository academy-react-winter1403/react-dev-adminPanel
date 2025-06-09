import { createSlice } from "@reduxjs/toolkit";

export const buildingListSlice = createSlice({
    name: "buildingListSlice",

    initialState: {
        buildingList: null
    },

    reducers: {
        addDataToBuildingList: (state, action) => {
            state.buildingList = action.payload
        }
    }
})

export default buildingListSlice.reducer