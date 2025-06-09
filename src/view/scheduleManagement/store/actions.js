import { adminSheduleSlice } from "./adminSheduleSlice";

export const {
  addDataToAdminSheduleState,
  addDataToAdminSheduleSingelState,
  changeAdminSheduleStartDate,
  changeAdminSheduleEndDate,
  resetAdminSheduleQuery,
  changeAdminShedulePageNumber,
  changeAdminSheduleRowsOfPage
} = adminSheduleSlice.actions;
