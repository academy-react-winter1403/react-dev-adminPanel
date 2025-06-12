import { createSlice } from "@reduxjs/toolkit";

export const courseReservDataSlice = createSlice({
    name: "courseReservDataSlice",

    initialState: {
        courseReservData: null,
        Query: "",
        PageNumber: 0,
        RowsOfPage: 10,
    },

    reducers: {
        addDataToCourseReservData: (state, action) => {
            state.courseReservData = action.payload
        },
        changeCourseReservRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload
        },
        changeCourseReservPageNumber: (state, action) => {
            state.PageNumber = action.payload
        },
        changeCourseReservQuery: (state, action) => {
            state.Query = action.payload
        }
    }
})

export default courseReservDataSlice.reducer