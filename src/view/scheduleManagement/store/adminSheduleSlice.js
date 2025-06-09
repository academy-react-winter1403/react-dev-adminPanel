import { createSlice } from "@reduxjs/toolkit";

export const adminSheduleSlice = createSlice({
  name: "adminSheduleSlice",

  initialState: {
    adminSheduleData: null,
    adminSheduleSingelData: null,

    adminSheduleQuery: {
      PageNumber: 0,
      RowsOfPage: 10,
      startDate: "1900/01/10",
      endDate: "3000/01/10",
    },
  },

  reducers: {
    addDataToAdminSheduleState: (state, action) => {
      state.adminSheduleData = action.payload;
    },
    addDataToAdminSheduleSingelState: (state, action) => {
      state.adminSheduleSingelData = action.payload;
    },
    changeAdminShedulePageNumber: (state, action) => {
      state.adminSheduleQuery.PageNumber = action.payload;
    },
    changeAdminSheduleRowsOfPage: (state, action) => {
      state.adminSheduleQuery.RowsOfPage = action.payload;
    },
    changeAdminSheduleStartDate: (state, action) => {
      state.adminSheduleQuery.startDate = action.payload;
    },
    changeAdminSheduleEndDate: (state, action) => {
      state.adminSheduleQuery.endDate = action.payload;
    },
    resetAdminSheduleQuery: (state, action) => {
      state.adminSheduleQuery.Query = action.payload;
    },
  },
});

export default adminSheduleSlice.reducer;
