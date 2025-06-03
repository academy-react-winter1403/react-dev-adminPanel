import { useState } from "react";
import ClassesList from "../list/ClassesList";
import {
  getClasseListData,
  getDeparmentData,
} from "../../../@core/services/api";
import { addClassesListData, addDataToDepartmentSlice } from "../store/actions";
import { useDispatch } from "react-redux";
import { addedDataToObject } from "../../../@core/hooks";

const ClassesListWrapper = () => {
  const dispatch = useDispatch();
  const [seccesFlag, setSuccesFlag] = useState(false);
  const [clasesRoomDataArray, setClassRoomDataArray] = useState(null);

  // get clases list data
  // const {
  //   data,
  //   isLoading,
  //   isSuccess,
  //   refetch: getClasesListRefetch,
  // } = getClasseListData("getClassesLisData", "/ClassRoom");

  // get department data
  // const {
  //   data: departmentData,
  //   isLoading: getDepartmentLoading,
  //   isSuccess: getDepartmentSucces,
  //   refetch: getDepartmentRefetch,
  // } = getDeparmentData("getDeparmentData", "/Department");
  // if (!getDepartmentLoading) {
  //   dispatch(addDataToDepartmentSlice(departmentData));
  // }

  // if (isSuccess && getDepartmentSucces) {
  //   if (!seccesFlag) {
  //     setSuccesFlag(true);
  //   }
  // }

  // if (isSuccess && getDepartmentSucces) {
  //   const dataFull = addedDataToObject(data, (item) => {
  //     let filterDepartment = departmentData.find(
  //       (el) => el.buildingId === item.buildingId
  //     );
  //     const buildingName = filterDepartment?.buildingName;
  //     const newField = { ...item, buildingName };
  //     return newField;
  //   });

  //   if (!clasesRoomDataArray) {
  //     setClassRoomDataArray(dataFull);
  //   }
  // }

  // if (seccesFlag) {
  //   const dataFull = addedDataToObject(data, (item) => {
  //     let filterDepartment = departmentData.find(
  //       (el) => el.buildingId === item.buildingId
  //     );
  //     const buildingName = filterDepartment?.buildingName;
  //     const newField = { ...item, buildingName };
  //     return newField;
  //   });

  //   if (!clasesRoomDataArray) {
  //     setClassRoomDataArray(dataFull);
  //   }
  // }

  // if (clasesRoomDataArray) {
  //   console.log("clasesRoomDataArray ==>", clasesRoomDataArray);
  //   dispatch(addClassesListData(clasesRoomDataArray));
  // }
  return (
    <ClassesList />
  );
};

export default ClassesListWrapper;
