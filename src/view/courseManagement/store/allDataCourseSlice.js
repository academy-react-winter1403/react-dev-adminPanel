import { createSlice } from "@reduxjs/toolkit";

const allDataCourseSlice = createSlice({
  name: "allDataCourseSlice",
  initialState: {
    CourseListChanges: [],
    totalCount: null,
    teacherId: null,
  },
  reducers: {
    setCourseListChanges: (state, action) => {
      state.CourseListChanges = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    setTeacherId: (state, action) => {
      state.teacherId = action.payload;
    },
  },
});
export const {
    setCourseListChanges,
    setTeacherId
} = allDataCourseSlice.actions;

export default allDataCourseSlice.reducer;
