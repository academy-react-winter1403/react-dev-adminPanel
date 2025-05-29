import { createSlice } from "@reduxjs/toolkit";

const allDataCourseSlice = createSlice({
  name: "allDataCourseSlice",
  initialState: {
    CourseListChanges: [],
    totalCount: null,
  },
  reducers: {
    setCourseListChanges: (state, action) => {
      state.CourseListChanges = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
  },
});
export const {
    setCourseListChanges
} = allDataCourseSlice.actions;

export default allDataCourseSlice.reducer;
