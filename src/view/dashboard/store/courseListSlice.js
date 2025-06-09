import { createSlice } from "@reduxjs/toolkit";

export const courseListSlice = createSlice({
    name: "courseListSlice",

    initialState: {
        courseListData: null,
        courseListTotalCount: null
    },

    reducers: {
        addCourseListData: (state, action) => {
            state.courseListData = action.payload
        },
        addCurseListTotalCount: (state, action) => {
            state.courseListTotalCount = action.payload
        }
    }
})

export default courseListSlice.reducer