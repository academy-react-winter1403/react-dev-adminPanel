import { createSlice } from "@reduxjs/toolkit";

export const teacherListSlice = createSlice({
    name: "teacherList",

    initialState: {
        theacherList: null,
        theacherTotalCount: null
    },

    reducers: {
        addTeacherListData: (state, action) => {
            state.theacherList = action.payload
        },
        addTheacherTotalCount: (state, action) => {
            state.theacherTotalCount = action.payload
        }
    }
})

export default teacherListSlice.reducer