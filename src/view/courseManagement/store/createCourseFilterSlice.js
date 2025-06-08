import { createSlice } from "@reduxjs/toolkit";

const createCourseFilterSlice = createSlice({
  name: "createCourseFilter",
  initialState: {
    courseType: [],
    courseLevel: [],
    status: [],
    classRoom: [],
    teachers: [],
    term: [],
    prerequisite: [],
  },
  reducers: {
    setCourseType: (state, action) => {
      state.courseType = action.payload;
    },
    setCourseLevel: (state, action) => {
      state.courseLevel = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setClassRoom: (state, action) => {
      state.classRoom = action.payload;
    },
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    setPrerequisite: (state, action) => {
      state.prerequisite = action.payload;
    },
  },
});

export const {
  setCourseType,
  setCourseLevel,
  setStatus,
  setClassRoom,
  setTeachers,
  setTerm,
  setPrerequisite,
} = createCourseFilterSlice.actions;
export default createCourseFilterSlice.reducer;