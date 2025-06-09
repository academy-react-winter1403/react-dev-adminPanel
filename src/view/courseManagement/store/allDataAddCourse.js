import { createSlice } from "@reduxjs/toolkit";

const allDataAddCourse = createSlice({
  name: "allDataAddCourse",
  initialState: {
    ImageCourse: null,
    CourseInfoStepOne: null,
    CourseInfoStepTwo: null,
    CourseInfoStepThree: null,
  },
  reducers:{
    setImageCourse:(state,action) => {
        state.ImageCourse = action.payload
    },
    setCourseInfoStepOne:(state,action) => {
        state.CourseInfoStepOne = action.payload
    },
    setCourseInfoStepTwo:(state,action) => {
        state.CourseInfoStepTwo = action.payload
    },
    setCourseInfoStepThree:(state,action) => {
        state.CourseInfoStepThree = action.payload
    }
  }
});
export const {
  setImageCourse,
  setCourseInfoStepOne,
  setCourseInfoStepTwo,
  setCourseInfoStepThree,
} = allDataAddCourse.actions;
export default allDataAddCourse.reducer;