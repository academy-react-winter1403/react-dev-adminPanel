import { createSlice } from "@reduxjs/toolkit";

export const courseGroupSlice = createSlice({
    name: "courseGroupSlice",
    initialState: {
        courseGroupData: null,
    },
    reducers: {
        addDataToCourseGroupState: (state, action) => {
            state.courseGroupData = action.payload
        }
    }
})

export default courseGroupSlice.reducer