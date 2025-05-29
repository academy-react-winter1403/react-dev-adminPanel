import { getData } from "./get-api/getData";
import { deleteData } from "./delete-api/deleteData";
// <<<<<<< HEAD
import { usePutData } from "./put-api/putData";
// import { getUserListData } from "./get-api/getUserListData";
// import { postLogin } from "./post-api/postLogin";
import { usePostData } from './post-api/postData';
import { getNewsDetailData } from "./get-api/getNewsDetailData";

// export { getData, getUserListData, usePostData, deleteData, usePutData, postLogin, getNewsDetailData };
// =======
// import { putData } from "./put-api/putData";
import { getUserListDataWithParams } from "./get-api/getUserListDataWithParams";
// import { postLogin } from "./post-api/postLogin";
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
import { getClasseListData } from "./get-api/getClassesListData";
import { getDeparmentData } from "./get-api/getDepartmentData";

export {
  getData,
  getUserListDataWithParams,
  usePostData,
  deleteData,
  // putData,
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
  getCourseListData,
  usePutData,
  getNewsDetailData,
  getClasseListData,
  getDeparmentData
};
// >>>>>>> 4c3cb5376a24b28a724db4f5500ebde5651b6617
