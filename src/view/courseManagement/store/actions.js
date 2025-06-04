import { classesListSlice } from "./classesListSlice";
import { departmentSlice } from "./departmentSlice";
import { levelDataSlice } from "./levelDataSlice";
import { statusDataSlice } from "./statusDataSlice";
import { technologiDataSlice } from "./technologiDataSlice";
import { termListSlice } from "./TermListSlice";

export const { addClassesListData, addClasesRoomDetail } = classesListSlice.actions
export const { addDataToDepartmentSlice, addDataToDepartmentDetail } = departmentSlice.actions
export const { addDataToTermList } = termListSlice.actions
export const { addDataToTechnologiState, addDataToTechnologiSingelState } = technologiDataSlice.actions
export const { addDataToStatusState, addDataToStatusSingelState } = statusDataSlice.actions
export const { addDataToLevelState, addDataToLevelSingelState } = levelDataSlice.actions