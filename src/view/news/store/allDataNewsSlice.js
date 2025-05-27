import { createSlice } from "@reduxjs/toolkit";

const allDataNewsSlice = createSlice({
  name: "allDataNewsSlice",
  initialState: {
    NewsListChanges: [],
    totalCount: null,
  },
  reducers: {
    handleNewsListChanges: (state, action) => {
      state.NewsListChanges = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
  },
});
export const {
    handleNewsListChanges
} = allDataNewsSlice.actions;

export default allDataNewsSlice.reducer;
