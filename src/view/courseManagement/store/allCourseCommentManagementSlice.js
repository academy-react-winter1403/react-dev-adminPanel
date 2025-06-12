import { createSlice } from "@reduxjs/toolkit";

export const allCourseCommentManagementSlice = createSlice({
    name: "commentManagement",
    initialState: {
        commentManagement: null,
        commentReplay: null,
        PageNumber: 1,
        RowsOfPage: 10,
        SortingCol: "DESC",
        SortingType: undefined,
        Accept: undefined,
        Query: null,
    },
    reducers: {
        addDataToCommentManagementState: (state, action) => {
            state.commentManagement = action.payload;
        },
        addDataToCommentManagementReplayState: (state, action) => {
            state.commentReplay = action.payload;
        },
        changeAllCourseCommentManagementPageNumber: (state, action) => {
            state.PageNumber = action.payload;
        },
        changeAllCourseCommentManagementRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload;
        },
        changeAllCourseCommentManagementQuery: (state, action) => {
            state.Query = action.payload;
        },
        changeAllCourseCommentManagementSortingCol: (state, action) => {
            state.SortingCol = action.payload;
        },
        changeAllCourseCommentManagementAccept: (state, action) => {
            state.Accept = action.payload;
        },
        changeAllCourseCommentManagementSortingType: (state, action) => {
            state.SortingType = action.payload;
        },
    },
});

export default allCourseCommentManagementSlice.reducer;