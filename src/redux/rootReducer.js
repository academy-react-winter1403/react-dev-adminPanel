// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import userListSlice from "../view/user/list/users/store/userListSlice";
import userFilterSlice from "../view/user/list/users/store/userFilterSlice";
import NewsListFilterSlice from "../view/news/store/NewsListFilterSlice";
import allDataNewsSlice from "../view/news/store/allDataNewsSlice";
import allDataAddNews from "../view/news/addNews/store/allDataAddNews";
import NewDetailSlice from "../view/news/NewsDetails/store/NewDetailSlice";
import CourseListFilterSlice from "../view/courses/store/CourseListFilterSlice";
import allDataCourseSlice from "../view/courses/store/allDataCourseSlice";

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
};

export default rootReducer;
