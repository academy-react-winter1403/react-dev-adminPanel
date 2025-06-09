import { adminInfoSlice } from "./adminInfoSlice";
import { courseReservListSlice } from "./courseReservListSlice";
import { teacherListSlice } from "./theacherListSlice";
import { courseListSlice } from "./courseListSlice";

export const { addDataTheAdminInfoState } = adminInfoSlice.actions
export const { addTeacherListData, addTheacherTotalCount } = teacherListSlice.actions
export const { addCourseReservListData, addCourseReservTotalCount } = courseReservListSlice.actions
export const { addCourseListData, addCurseListTotalCount } = courseListSlice.actions