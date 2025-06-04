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
import { getClasesRoomDataWithId } from "./get-api/getClasesRoomDataWithId";
import { useUpdateClasesRoom } from "./put-api/useUpdateClasesRoom";
import { getBuildingData } from "./get-api/getBuildingData";
import { getDepartmentDataWithId } from "./get-api/getDepartmentDataWithId";
import { createClasesRoomPost } from "./post-api/createLasesRoomPost";
import { useUpdateListOfSections } from "./put-api/useUpdateListOfSections";
import { useDepartmentPost } from "./post-api/useDepartmentPost";
import { useGetTermList } from "./get-api/useGetTermList";
import { createTermPost } from "./post-api/createTermPost";
import { updateTerm } from "./put-api/updateTerm";
import { createTermDate } from "./post-api/createTermDate";
import { updateTermDate } from "./put-api/updateTermDate";
import { getTechnologiData } from "./get-api/getTechnologiData";
import { createTechnologi } from "./post-api/createTechnologi";
import { updateTechnologi } from "./put-api/updateTechnologi";
import { getStatusData } from "./get-api/getSatusData";
import { updateStatus } from "./put-api/updateStatus";
import { createStatusPost } from "./post-api/createStatus";
import { getLevelData } from "./get-api/getLevelData";
import { createLevelPost } from "./post-api/createLevelPost";
import { updateLevel } from "./put-api/updateLevel";

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
  getDeparmentData,
  getClasesRoomDataWithId,
  useUpdateClasesRoom,
  getBuildingData,
  getDepartmentDataWithId,
  createClasesRoomPost,
  useUpdateListOfSections,
  useDepartmentPost,
  useGetTermList,
  createTermPost,
  updateTerm,
  createTermDate,
  updateTermDate,
  getTechnologiData,
  createTechnologi,
  updateTechnologi,
  getStatusData,
  updateStatus,
  createStatusPost,
  getLevelData,
  createLevelPost,
  updateLevel
};
// >>>>>>> 4c3cb5376a24b28a724db4f5500ebde5651b6617
