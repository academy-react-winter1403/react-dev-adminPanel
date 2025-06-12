import { allCourseAdminDataSlice } from "./allCourseAdminDataSlice";
import { allCourseCommentManagementSlice } from "./allCourseCommentManagementSlice";
import { assistanceWorkDataSlice } from "./assistanceWorkDataSlice";
import { classesListSlice } from "./classesListSlice";
import { courseGroupSlice } from "./courseGroupSlice";
import { coursePaymentSlice } from "./coursePaymentSlice";
import { courseReservDataSlice } from "./courseReservDataSlice";
import { departmentSlice } from "./departmentSlice";
import { levelDataSlice } from "./levelDataSlice";
import { mentorSliceData } from "./mentorSliceData";
import { statusDataSlice } from "./statusDataSlice";
import { technologiDataSlice } from "./technologiDataSlice";
import { termListSlice } from "./TermListSlice";
import { virtualGroupsSlice } from "./virtualGroupsSlice";
import { workDataSlice } from "./workDdataSlice";

export const { addClassesListData, addClasesRoomDetail } =
  classesListSlice.actions;
export const { addDataToDepartmentSlice, addDataToDepartmentDetail } =
  departmentSlice.actions;
export const { addDataToTermList } = termListSlice.actions;
export const { addDataToTechnologiState, addDataToTechnologiSingelState } =
  technologiDataSlice.actions;
export const { addDataToStatusState, addDataToStatusSingelState } =
  statusDataSlice.actions;
export const { addDataToLevelState, addDataToLevelSingelState } =
  levelDataSlice.actions;
export const { addDataToWorkState, addDataToWorkSingelData } =
  workDataSlice.actions;
export const {
  addDataToAssistanceWorkState,
  addDataToAssistanceWorkSingrlState,
} = assistanceWorkDataSlice.actions;
export const {
  addDataToAllCourseAdmin,
  addDataToSingelCourseAdmin,
  changeAllCourseAdminPageNumber,
  changeAllCourseAdminRowsOfPage,
  changeAllCourseAdminQuery,
  addDataToCourseUserList,
} = allCourseAdminDataSlice.actions;

export const {
  addDataToCourseGroupState,
  addDataToCourseVirtualGroupState,
  changeGroupPageNumber,
  changeGroupRowsOfPage,
  changeVirtualGroupPageNumber,
  changeVirtualGroupRowsOfPage,
} = courseGroupSlice.actions;
export const {
  addDataToCourseReservData,
  changeCourseReservRowsOfPage,
  changeCourseReservPageNumber,
  changeCourseReservQuery,
} = courseReservDataSlice.actions;

export const { addDataToCoursePaymentState } = coursePaymentSlice.actions;

export const {
  addDataToVirtualGroupsState,
  changeVirtualGroupsPageNumber,
  changeVirtualGroupsRowsOfPage,
  changeVirtualGroupsQuery,
} = virtualGroupsSlice.actions;

export const {
  addDataToMentorList,
  addDataToMentorSingel,
  changeMentorDataPageNumber,
  changeMentorDataRowsOfPage,
} = mentorSliceData.actions;

export const {
  addDataToCommentManagementState,
  addDataToCommentManagementReplayState,
  changeAllCourseCommentManagementAccept,
  changeAllCourseCommentManagementPageNumber,
  changeAllCourseCommentManagementRowsOfPage,
  changeAllCourseCommentManagementQuery,
  changeAllCourseCommentManagementSortingCol,
  changeAllCourseCommentManagementSortingType,
} = allCourseCommentManagementSlice.actions;
