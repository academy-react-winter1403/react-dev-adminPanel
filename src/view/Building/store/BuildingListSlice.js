import { createSlice } from "@reduxjs/toolkit";

const BuildingListSlice = createSlice({
  name: "BuildingListSlice",
  initialState: {
    id: null,
    active: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {
  setId,
  setActive,
} = BuildingListSlice.actions;

export default BuildingListSlice.reducer;
