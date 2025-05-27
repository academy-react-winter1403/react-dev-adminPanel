import { getData } from "./get-api/getData";
import { postData } from "./post-api/postData";
import { deleteData } from "./delete-api/deleteData";
import { putData } from "./put-api/putData";
import { getUserListDataWithParams } from "./get-api/getUserListDataWithParams";
import { postLogin } from "./post-api/postLogin";
import { getUserListDataByAction } from "./get-api/getUserListDataWithParams";
import { createUserPost } from "./post-api/createUserPost";
import { getUserInfoData } from "./get-api/getUserInfoData";
import { updateUserInformation } from "./put-api/updateUserInformation";
import { postAcceptComment } from "./post-api/postAcceptComment";
import { getUserComment } from "./get-api/getUserComment";
import { postRejectedComment } from "./post-api/postRejectedComment";
import { deleteComment } from "./delete-api/deleteComment";
import { deleteUser } from "./delete-api/deleteUser";
import { getUserCommentByAdmin } from "./get-api/getUserCommentByAdmin";
import { getTeacherList } from "./get-api/getTiacherList";
import { getCourseReservData } from "./get-api/getCourseReservData";
import { getUserListData } from "./get-api/getUserListData";
import { getCourseListData } from "./get-api/getCourseListData";

export {
  getData,
  getUserListDataWithParams,
  postData,
  deleteData,
  putData,
  postLogin,
  getUserListDataByAction,
  createUserPost,
  getUserInfoData,
  updateUserInformation,
  postAcceptComment,
  getUserComment,
  postRejectedComment,
  deleteComment,
  deleteUser,
  getUserCommentByAdmin,
  getTeacherList,
  getCourseReservData,
  getUserListData,
  getCourseListData
};
