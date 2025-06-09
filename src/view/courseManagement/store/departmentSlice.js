import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: "departmentSlice",

    initialState: {
        departmentSliceData: null,
        departmentDetail: null
    },

    reducers: {
        addDataToDepartmentSlice: (state, action) => {
            state.departmentSliceData = action.payload
        },
        addDataToDepartmentDetail: (state, action) => {
            state.departmentDetail = action.payload
        }
    }
})

export default departmentSlice.reducer