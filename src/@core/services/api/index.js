import { getData } from "./get-api/getData";
import { deleteData } from "./delete-api/deleteData";
// <<<<<<< HEAD
import { usePutData } from "./put-api/putData";
// import { getUserListData } from "./get-api/getUserListData";
// import { postLogin } from "./post-api/postLogin";
import { usePostData } from "./post-api/postData";
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
import { getWorkData } from "./get-api/getWorkData";
import { getAssistanceWorkData } from "./get-api/getAssistanceWorkData";
import { getCourseAssistanceWithId } from "./get-api/getCourseAssistanceWithId";
import { createAssistanceWork } from "./post-api/createAssistanceWork";
import { getWorkDataWithId } from "./get-api/getWorkDataWithId";
import { updateTasks } from "./put-api/updateTasks";
import { getAllCourseAdmin } from "./get-api/getAllCourseAdmin";
import { getCourseAdminWithId } from "./get-api/getCourseAdminWithId";
import { getCourseUserListData } from "./get-api/getCourseUserListData";
import { getCourseGroupsWithId } from "./get-api/getCourseGroupsWithId";
import { usePostDataTechnology } from "./post-api/usePostDataTechnology";
import { getCoursePaymentIdData } from "./get-api/getCoursePaymentId";
import { useDeleteData } from "./delete-api/useDeleteData";
import { useGetDataWithParams } from "./get-api/useGetDataWithParams";

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
  updateLevel,
  getWorkData,
  getAssistanceWorkData,
  getCourseAssistanceWithId,
  createAssistanceWork,
  getWorkDataWithId,
  updateTasks,
  getAllCourseAdmin,
  getCourseAdminWithId,
  getCourseUserListData,
  getCourseGroupsWithId,
  usePostDataTechnology,
  getCoursePaymentIdData,
  useDeleteData,
  useGetDataWithParams
};
