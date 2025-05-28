import { createSlice } from "@reduxjs/toolkit";

const CourseListFilterSlice = createSlice({
  name: "CourseListFilterSlice",
  initialState: {
    PageNumber: 1,
    RowsOfPage: 12,
    SortingCol: null,
    SortType: null,
    Query: "",
    IsActive: true,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    setRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    setSortingCol: (state, action) => {
      state.SortingCol = action.payload;
    },
    setSortType: (state, action) => {
      state.SortType = action.payload;
    },
    setQuery: (state, action) => {
      state.Query = action.payload;
    },
    setIsActive: (state, action) => {
      state.IsActive = action.payload;
    },
  },
});

export const {
  setPageNumber,
  setRowsOfPage,
  setSortingCol,
  setSortType,
  setQuery,
  setIsActive,
} = CourseListFilterSlice.actions;

export default CourseListFilterSlice.reducer;