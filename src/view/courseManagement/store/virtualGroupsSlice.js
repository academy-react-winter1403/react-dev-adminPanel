import { createSlice } from "@reduxjs/toolkit";

export const virtualGroupsSlice = createSlice({
    name: "virtualGroupsSlice",

    initialState: {
        virtualGroupsData: null,
        virtualGroupsRowsOfPage: 5,
        virtualGroupsPageNumber: 0,
        virtualGroupsQuery: null
    },

    reducers: {
        addDataToVirtualGroupsState: (state, action) => {
            state.virtualGroupsData = action.payload
        },
        changeVirtualGroupsPageNumber: (state, action) => {
            state.virtualGroupsPageNumber = action.payload
        },
        changeVirtualGroupsRowsOfPage: (state, action) => {
            state.virtualGroupsRowsOfPage = action.payload
        },
        changeVirtualGroupsQuery: (state, action) => {
            state.virtualGroupsQuery = action.payload
        }
    }
})

export default virtualGroupsSlice.reducer