import { buildingSlice } from "./buildingSlice";
import { commentManagementSlice } from "./commentManagementSlice";

export const { addCommnetManagementData, addCommnetManagementTotalCount } =
  commentManagementSlice.actions;


export const { addDataToBuildingSlice } = buildingSlice.actions