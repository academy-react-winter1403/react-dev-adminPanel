import { createSlice } from "@reduxjs/toolkit";

const NewsListFilterSlice = createSlice({
  name: "NewsListFilterSlice",
  initialState: {
    PageNumber: 1,
    RowsOfPage: 12,
    SortingCol: null,
    SortType: null,
    Query: "",
    IsActive: true,
    // totalCount
  },
  reducers: {
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
  handlePageNumber,
  handleRowsOfPage,
  handleSortingCol,
  handleSortType,
  handleQuery,
  handleIsActive,
} = NewsListFilterSlice.actions;

export default NewsListFilterSlice.reducer;