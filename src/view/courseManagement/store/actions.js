import { classesListSlice } from "./classesListSlice";
import { departmentSlice } from "./departmentSlice";
import { termListSlice } from "./TermListSlice";

export const { addClassesListData, addClasesRoomDetail } = classesListSlice.actions
export const { addDataToDepartmentSlice, addDataToDepartmentDetail } = departmentSlice.actions
export const { addDataToTermList } = termListSlice.actions