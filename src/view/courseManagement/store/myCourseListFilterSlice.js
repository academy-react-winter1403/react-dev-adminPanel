import { createSlice } from "@reduxjs/toolkit";

const myCourseListFilterSlice = createSlice({
  name: "myCourseListFilterSlice",
  initialState: {
    PageNumber: 1,
    RowsOfPage: 12,
    SortingCol: null,
    SortType: null,
    Query: null,
  },
  reducers: {
    setPageNumberMyCourse: (state, action) => {
      state.PageNumber = action.payload;
    },
    setRowsOfPageMyCourse: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    setSortingColMyCourse: (state, action) => {
      state.SortingCol = action.payload;
    },
    setSortTypeMyCourse: (state, action) => {
      state.SortType = action.payload;
    },
    setQueryMyCourse: (state, action) => {
      state.Query = action.payload;
    },
  },
});

export const {
  setPageNumberMyCourse,
  setRowsOfPageMyCourse,
  setSortingColMyCourse,
  setSortTypeMyCourse,
  setQueryMyCourse,
} = myCourseListFilterSlice.actions;

export default myCourseListFilterSlice.reducer;