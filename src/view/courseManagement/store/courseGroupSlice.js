import { createSlice } from "@reduxjs/toolkit";

export const courseGroupSlice = createSlice({
    name: "courseGroupSlice",
    initialState: {
        courseGroupData: null,
        courseVirtualGroupData: null,

        groupQuery: {
            PageNumber: 0,
            RowsOfPage: 10,
        },

        virtualGroupQuery: {
            PageNumber: 0,
            RowsOfPage: 10,
        }
    },
    reducers: {
        addDataToCourseGroupState: (state, action) => {
            state.courseGroupData = action.payload
        },
        addDataToCourseVirtualGroupState: (state, action) => {
            state.courseVirtualGroupData = action.payload
        },
        changeGroupPageNumber: (state, action) => {
            state.groupQuery.PageNumber = action.payload
        },
        changeGroupRowsOfPage: (state, action) => {
            state.groupQuery.RowsOfPage = action.payload
        },
        changeVirtualGroupPageNumber: (state, action) => {
            state.virtualGroupQuery.PageNumber = action.payload
        },
        changeVirtualGroupRowsOfPage: (state, action) => {
            state.virtualGroupQuery.RowsOfPage = action.payload
        }
    }
})

export default courseGroupSlice.reducer