import { createSlice } from "@reduxjs/toolkit";

const NewsList = createSlice({
  name: "NewsList",
  initialState: {
    NewsListChanges: [],
    PageNumber: 1,
    RowsOfPage: 15,
    SortingCol: null,
    SortType: null,
    Query: "",
    IsActive: true,
  },
  reducers: {
    handleNewsListChanges: (state, action) => {
      state.NewsListChanges = action.payload;
    },
    handlePageNumber: (state, action) => {
      state.PageNumber = action.payload;
    },
    handleRowsOfPage: (state, action) => {
      state.RowsOfPage = action.payload;
    },
    handleSortingCol: (state, action) => {
      state.SortingCol = action.payload;
    },
    handleSortType: (state, action) => {
      state.SortType = action.payload;
    },
    handleQuery: (state, action) => {
      state.Query = action.payload;
    },
    handleIsActive: (state, action) => {
      state.IsActive = action.payload;
    },
  },
});

export const {
  handleNewsListChanges,
  handlePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQuery,
  handleIsActive,
} = NewsList.actions;

export default NewsList.reducer;