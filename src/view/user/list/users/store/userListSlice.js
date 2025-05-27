import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
    name: "useListSlice",

    initialState: {
        userList: null,
        addFlag: true,
        userListTotalCount: null
    },

    reducers: {
        firstAddDataToUserList: (state, action) => {
            state.userList = action.payload
        },
        changeAddFlag: (state, action) => {
            state.addFlag = action.payload
        },
        addUserListTotalCount: (state, action) => {
            state.userListTotalCount = action.payload
        }
    }
})


// const userListFlag = createSlice()

export default userListSlice.reducer