import { configureStore } from "@reduxjs/toolkit";
import { userListSlice } from "./slice";

const userListStore = configureStore({
    reducer: {
        userListData: userListSlice.reducer
    }
})

export default userListStore