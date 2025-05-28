import { createSlice } from "@reduxjs/toolkit";

export const userCommentFilterSlice = createSlice({
    name: "userCommentFilterSlice",

    initialState: {
        PageNumber: 1,
        RowsOfPage: 5,
        SortingCol: "DESC",
        SortType: "InsertDate",
        Query: null,
        Accept: true,
        userId: null
    },

    reducers: {
        changePageNumberUCF: (state, action) => {
            state.PageNumber = action.payload
        },
        changeRowsOfPageUCF: (state, action) => {
            state.RowsOfPage = action.payload
        },
        changeSortingColUCF: (state, action) => {
            state.SortingCol = action.payload
        },
        changeSortTypeUCF: (state, action) => {
            state.SortType = action.payload
        },
        changeQueryUCF: (state, action) => {
            state.Query = action.payload
        },
        changeAcceptUCF: (state, action) => {
            state.Accept = action.payload
        },
        changeUserIdtUCF: (state, action) => {
            state.userId = action.payload
        },
    }
})

export default userCommentFilterSlice.reducer