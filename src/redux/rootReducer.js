// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice";
import userFilterSlice from "../view/user/list/users/store/userFilterSlice";
import userInformationSlice from "../view/user/list/users/store/userInformationSlice";
import userCommentFilterSlice from "../view/user/list/users/store/userCommentFilterSlice";
import userCommentSlice from "../view/user/list/users/store/userCommentSlice";
import adminInfoSlice from "../view/dashboard/store/adminInfoSlice"
import commentManagementSlice from "../view/partialSlice/commentManagementSlice"
import teacherListSlice from "../view/dashboard/store/theacherListSlice"
import courseReservListSlice from "../view/dashboard/store/courseReservListSlice"
import courseListSlice from "../view/dashboard/store/courseListSlice"

const rootReducer = {
  navbar,
  layout,
  userListSlice,
  userFilterSlice,
  userInformationSlice,
  userCommentFilterSlice,
  userCommentSlice,
  adminInfoSlice,
  commentManagementSlice,
  teacherListSlice,
  courseReservListSlice,
  courseListSlice
};

export default rootReducer;