import { createSlice } from "@reduxjs/toolkit";

export const classesListSlice = createSlice({
    name: "classesListSlice",

    initialState: {
        classesList: null,
        clasesRoomDetail: null
    },

    reducers: {
        addClassesListData: (state, action) => {
            state.classesList = action.payload
        },
        addClasesRoomDetail: (state, action) => {
            state.clasesRoomDetail = action.payload
        }
    }
})

export default classesListSlice.reducer