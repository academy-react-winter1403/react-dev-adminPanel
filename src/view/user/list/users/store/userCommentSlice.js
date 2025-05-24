import { createSlice } from "@reduxjs/toolkit";

export const userCommentSlice = createSlice({
    name: "userCommentSlice",

    initialState: {
        userComment: null,
        totalCount: null
    },

    reducers: {
        addUserCommnetData: (state, action) => {
            state.userComment = action.payload
        },
        changeTotalCount: (state, action) => {
            state.totalCount = action.payload
        }
    }
})

export default userCommentSlice.reducer