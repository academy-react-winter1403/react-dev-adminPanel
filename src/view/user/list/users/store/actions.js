import { userListSlice } from "./userListSlice";
import { userFilterSlice } from "./userFilterSlice";

export const { firstAddDataToUserList } = userListSlice.actions;

export const {
  changeUserFilterIsActiveUser,
  changeUserFilterIsDeletedUser,
  changeUserFilterPageNumber,
  changeUserFilterQuery,
  changeUserFilterRoleId,
  changeUserFilterRowsOfPage,
  changeUserFilterSortType,
  changeUserFilterSortingCol
} = userFilterSlice.actions;
