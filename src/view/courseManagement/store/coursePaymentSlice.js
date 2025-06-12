import { createSlice } from "@reduxjs/toolkit";

export const coursePaymentSlice = createSlice({
    name: "coursePaymentSlice",

    initialState: {
        coursePaymentDataState: null,
        PageNumber: 1,
        RowsOfPage: 10,
        Query: "",
    },

    reducers: {
        addDataToCoursePaymentState: (state, action) => {
            state.coursePaymentDataState = action.payload
        },
        changeCoursePaymentRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload
        },
        changeCoursePaymentPageNumber: (state, action) => {
            state.PageNumber = action.payload
        },
        changeCoursePaymentQuery: (state, action) => {
            state.Query = action.payload
        }
    }
})

export default coursePaymentSlice.reducer;