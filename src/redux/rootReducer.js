// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice";
import userFilterSlice from "../view/user/list/users/store/userFilterSlice";
import userInformationSlice from "../view/user/list/users/store/userInformationSlice";
import userCommentFilterSlice from "../view/user/list/users/store/userCommentFilterSlice";
import userCommentSlice from "../view/user/list/users/store/userCommentSlice";

const rootReducer = {
  navbar,
  layout,
  userListSlice,
  userFilterSlice,
  userInformationSlice,
  userCommentFilterSlice,
  userCommentSlice
};

export default rootReducer;