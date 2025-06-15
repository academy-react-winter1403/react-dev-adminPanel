import { createSlice } from "@reduxjs/toolkit";

const CoursePaymentDetailSlice = createSlice({
  name: "CoursePaymentDetailSlice",
  initialState: {
    paymentPageNumber: null,
    paymentRowsOfPage: null,
    paymentQuery: null,
    paymentTotalCount: null,
    paymentAllData: null,
    paymentId: null,
  },
  reducers: {
    setPaymentPageNumber: (state, action) => {
      state.paymentPageNumber = action.payload;
    },
    setPaymentRowsOfPage: (state, action) => {
      state.paymentRowsOfPage = action.payload;
    },
    setPaymentQuery: (state, action) => {
      state.paymentQuery = action.payload;
    },
    setPaymentTotalCount: (state, action) => {
      state.paymentTotalCount = action.payload;
    },
    setPaymentAllData: (state, action) => {
      state.paymentAllData = action.payload;
    },
    setPaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
  },
});

export const {
  setPaymentPageNumber,
  setPaymentRowsOfPage,
  setPaymentQuery,
  setPaymentTotalCount,
  setPaymentAllData,
  setPaymentId,
} = CoursePaymentDetailSlice.actions;
export default CoursePaymentDetailSlice.reducer;
