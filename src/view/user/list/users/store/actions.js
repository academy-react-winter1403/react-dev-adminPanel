import { userListSlice } from "./userListSlice";
import { userFilterSlice } from "./userFilterSlice";
import { userInformationSlice } from "./userInformationSlice";
import { userCommentFilterSlice } from "./userCommentFilterSlice";
import { userCommentSlice } from "./userCommentSlice";

export const { firstAddDataToUserList, changeAddFlag } = userListSlice.actions;

export const {
  changeUserFilterIsActiveUser,
  changeUserFilterIsDeletedUser,
  changeUserFilterPageNumber,
  changeUserFilterQuery,
  changeUserFilterRoleId,
  changeUserFilterRowsOfPage,
  changeUserFilterSortType,
  changeUserFilterSortingCol,
} = userFilterSlice.actions;

export const { addUserInfoData } = userInformationSlice.actions;

// user comment filter actions
export const {
  changeAcceptUCF,
  changePageNumberUCF,
  changeQueryUCF,
  changeRowsOfPageUCF,
  changeSortTypeUCF,
  changeSortingColUCF,
  changeUserIdtUCF,
} = userCommentFilterSlice.actions;
// user comment filter actions

// user comment slice
export const { addUserCommnetData, changeTotalCount } =
  userCommentSlice.actions;
// user comment slice
