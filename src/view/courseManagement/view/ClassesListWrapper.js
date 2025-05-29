import { useState } from "react";
import ClassesList from "../list/ClassesList";
import {
  getClasseListData,
  getDeparmentData,
} from "../../../@core/services/api";
import { addClassesListData } from "../store/actions";
import { useDispatch } from "react-redux";
import { addedDataToObject } from "../../../@core/hooks";

const ClassesListWrapper = () => {
  const dispatch = useDispatch();
  const [seccesFlag, setSuccesFlag] = useState(false);
  const [clasesRoomDataArray, setClassRoomDataArray] = useState(null)

  // get clases list data
  const { data, isLoading, isSuccess } = getClasseListData(
    "getClassesLisData",
    "/ClassRoom"
  );

  // 
  const {
    data: departmentData,
    isLoading: getDepartmentLoading,
    isSuccess: getDepartmentSucces,
  } = getDeparmentData("getDeparmentData", "/Department");
  if (!getDepartmentLoading) {
    console.log(departmentData);
  }

  if (isSuccess && getDepartmentSucces) {
    if (!seccesFlag) {
      setSuccesFlag(true);
    }
  }

  if (seccesFlag) {
    const dataFull = addedDataToObject(data, (item) => {
        let filterDepartment = departmentData.find(el => el.buildingId === item.buildingId)
        const buildingName = filterDepartment?.buildingName
        const newField = {...item, buildingName}
        return newField
    })
    if (!clasesRoomDataArray) {
        setClassRoomDataArray(dataFull)
    }
  }

  if (clasesRoomDataArray) {
    console.log("clasesRoomDataArray ==>", clasesRoomDataArray)
    dispatch(addClassesListData(clasesRoomDataArray));
  }
  return <ClassesList />;
};

export default ClassesListWrapper;
