import { createSlice } from "@reduxjs/toolkit";

export const commentManagementSlice = createSlice({
    name: "commentSlice",

    initialState: {
        commnetManagementData: null,
        totalCount: null
    },

    reducers: {
        addCommnetManagementData: (state, action) => {
            state.commnetManagementData = action.payload
        },
        addCommnetManagementTotalCount: (state, action) => {
            state.totalCount = action.payload
        }
    }
})

export default commentManagementSlice.reducer