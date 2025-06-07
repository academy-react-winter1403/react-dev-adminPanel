// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice";
import userFilterSlice from "../view/user/list/users/store/userFilterSlice";
import NewsListFilterSlice from "../view/news/store/NewsListFilterSlice";
import allDataNewsSlice from "../view/news/store/allDataNewsSlice";
import allDataAddNews from "../view/news/addNews/store/allDataAddNews";
import NewDetailSlice from "../view/news/NewsDetails/store/NewDetailSlice";
// <<<<<<< HEAD
// import CourseListFilterSlice from "../view/courses/store/CourseListFilterSlice";
// import allDataCourseSlice from "../view/courses/store/allDataCourseSlice";
import userInformationSlice from "../view/user/list/users/store/userInformationSlice";
import userCommentFilterSlice from "../view/user/list/users/store/userCommentFilterSlice";
import userCommentSlice from "../view/user/list/users/store/userCommentSlice";
import adminInfoSlice from "../view/dashboard/store/adminInfoSlice"
import commentManagementSlice from "../view/partialSlice/commentManagementSlice"
import teacherListSlice from "../view/dashboard/store/theacherListSlice"
import courseReservListSlice from "../view/dashboard/store/courseReservListSlice"
import courseListSlice from "../view/dashboard/store/courseListSlice"
// =======
import CourseListFilterSlice from "../view/courseManagement/store/CourseListFilterSlice";
import allDataCourseSlice from "../view/courseManagement/store/allDataCourseSlice";
import classesListSlice from "../view/courseManagement/store/classesListSlice"
import departmentSlice  from "../view/courseManagement/store/departmentSlice";
import buildingListSlice from "../view/courseManagement/store/buildingListSlice";
import buildingSlice from "../view/partialSlice/buildingSlice";
import termListSlice from "../view/courseManagement/store/TermListSlice";
import technologiDataSlice from "../view/courseManagement/store/technologiDataSlice";
import statusDataSlice from "../view/courseManagement/store/statusDataSlice";
import levelDataSlice from "../view/courseManagement/store/levelDataSlice";
import workDataSlice from "../view/courseManagement/store/workDdataSlice";
import assistanceWorkDataSlice from "../view/courseManagement/store/assistanceWorkDataSlice";
import allCourseAdminDataSlice from "../view/courseManagement/store/allCourseAdminDataSlice";
// >>>>>>> 09dfb81eb33478d1fddc33bf176052c9a82fa83e

const rootReducer = {
  navbar,
  layout,
  userListSlice,
  userFilterSlice,
  NewsListFilterSlice,
  allDataNewsSlice,
  allDataAddNews,
  NewDetailSlice,
  CourseListFilterSlice,
  allDataCourseSlice,
  userInformationSlice,
  userCommentFilterSlice,
  userCommentSlice,
  adminInfoSlice,
  commentManagementSlice,
  teacherListSlice,
  courseReservListSlice,
  courseListSlice,
  classesListSlice,
  departmentSlice,
  buildingListSlice,
  buildingSlice,
  termListSlice,
  technologiDataSlice,
  statusDataSlice,
  levelDataSlice,
  workDataSlice,
  assistanceWorkDataSlice,
  allCourseAdminDataSlice
};

export default rootReducer;