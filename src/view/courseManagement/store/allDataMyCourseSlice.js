import { createSlice } from "@reduxjs/toolkit";

const allDataMyCourseSlice = createSlice({
  name: "allDataMyCourseSlice",
  initialState: {
    MyCourseListChanges: null,
    totalCount: null,
  },
  reducers: {
    setMyCourseListChanges: (state, action) => {
      state.MyCourseListChanges = action.payload
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    }
  },
});
export const {
    setMyCourseListChanges,
    setTotalCount
} = allDataMyCourseSlice.actions;

export default allDataMyCourseSlice.reducer;
