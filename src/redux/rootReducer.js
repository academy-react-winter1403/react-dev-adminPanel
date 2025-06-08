// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice";
import userFilterSlice from "../view/user/list/users/store/userFilterSlice";
import NewsListFilterSlice from "../view/news/store/NewsListFilterSlice";
import allDataNewsSlice from "../view/news/store/allDataNewsSlice";
import allDataAddNews from "../view/news/addNews/store/allDataAddNews";
import NewDetailSlice from "../view/news/NewsDetails/store/NewDetailSlice";
import CourseListFilterSlice from "../view/courseManagement/store/CourseListFilterSlice";
import allDataCourseSlice from "../view/courseManagement/store/allDataCourseSlice";
import createCourseFilterSlice from "../view/courseManagement/store/createCourseFilterSlice";
import allDataAddCourse from "../view/courseManagement/store/allDataAddCourse";
// ** Reducers
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
  createCourseFilterSlice,
  allDataAddCourse,
};

export default rootReducer;
