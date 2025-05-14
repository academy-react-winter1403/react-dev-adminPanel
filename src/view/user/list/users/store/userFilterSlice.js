import { createSlice } from "@reduxjs/toolkit";

const userFilterSlice = createSlice({
    name: "userFilterSlice",

    initialState: {
        params: {
            PageNumber: 1,
            RowsOfPage: 10,
            SortingCol: "DESC",
            SortType: null,
            Query: null,
            IsActiveUser: true,
            IsDeletedUser: true,
            roleId: undefined
        },
        userQueryFlag: false
    },

    reducers: {
        changeUserFilterPageNumber: (state, actions) => {
            state.PageNumber = actions.payload
        },
        changeUserFilterRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload
        },
        changeUserFilterSortingCol: (state, action) => {
            state.SortingCol = action.payload
        },
        changeUserFilterSortType: (state, action) => {
            state.SortType = action.payload
        },
        changeUserFilterQuery: (state, action) => {
            state.Query = action.payload
        },
        changeUserFilterIsActiveUser: (state, action) => {
            state.IsActiveUser = action.payload
        },
        changeUserFilterIsDeletedUser: (state, action) => {
            state.IsDeletedUser = action.payload
        },
        changeUserFilterRoleId: (state, action) => {
            state.roleId = action.payload
        },
    }
})

export default userFilterSlice.reducer