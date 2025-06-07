import { createSlice } from "@reduxjs/toolkit";

export const allCourseAdminDataSlice = createSlice({
    name: "allCourseAdminDataSlice",

    initialState: {
        allCourseAminData: [1, 2],
        singelCourseAdmin: null,

        courseUserList: null,

        PageNumber: 0,
        RowsOfPage: 8,
        Query: null
    },

    reducers: {
        addDataToAllCourseAdmin: (state, action) => {
            state.allCourseAminData = action.payload
        },
        addDataToSingelCourseAdmin: (state, action) => {
            state.singelCourseAdmin = action.payload
        },
        changeAllCourseAdminPageNumber: (state, action) => {
            state.PageNumber = action.payload
        },
        changeAllCourseAdminRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload
        },
        changeAllCourseAdminQuery: (state, action) => {
            state.Query = action.payload
        },
        addDataToCourseUserList: (state, action) => {
            state.courseUserList = action.payload
        }
    }
})

export default allCourseAdminDataSlice.reducer