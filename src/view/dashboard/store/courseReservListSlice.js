import { createSlice } from "@reduxjs/toolkit";

export const courseReservListSlice = createSlice({
    name: "courseReserv",

    initialState: {
        courseReservListData: null,
        courseReservTotalCount: null
    },

    reducers: {
        addCourseReservListData: (state, action) => {
            state.courseReservListData = action.payload
        },
        addCourseReservTotalCount: (state, action) => {
            state.courseReservTotalCount = action.payload
        }
    }
})

export default courseReservListSlice.reducer