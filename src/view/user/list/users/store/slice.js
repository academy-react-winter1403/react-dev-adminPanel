import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name: "useListSlice",

    initialState: {
        userList: []
    },

    reducers: {
        firstAddDataToUserList: (state, action) => {
            state.userList = action.payload
        }
    }
})


// const userListFlag = createSlice()


export { userListSlice }