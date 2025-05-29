import { createSlice } from "@reduxjs/toolkit";

export const classesListSlice = createSlice({
    name: "classesListSlice",

    initialState: {
        classesList: null
    },

    reducers: {
        addClassesListData: (state, action) => {
            state.classesList = action.payload
        }
    }
})

export default classesListSlice.reducer