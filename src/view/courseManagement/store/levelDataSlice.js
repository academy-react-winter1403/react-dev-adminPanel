import { createSlice } from "@reduxjs/toolkit";

export const levelDataSlice = createSlice({
    name: "levelDataSlice",

    initialState: {
        levelData: null,
        levelSingelData: null
    },

    reducers: {
        addDataToLevelState: (state, action) => {
            state.levelData = action.payload
        },
        addDataToLevelSingelState: (state, action) => {
            state.levelSingelData = action.payload
        }
    }
})

export default levelDataSlice.reducer