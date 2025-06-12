import { Card, Col } from "reactstrap";
import UserTable from "../../user/list/UserTable";
import { useEffect, useState } from "react";
import Export from "../../../@core/components/common/Export/Export";
import {
  createClasesRoomPost,
  getBuildingData,
  getClasseListData,
  getDeparmentData,
  useUpdateClasesRoom,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addClasesRoomDetail,
  addDataToDepartmentSlice,
} from "../store/actions";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import CreateClassRoom from "./CreateClasesRoom";
import { addDataToBuildingSlice } from "../../partialSlice/actions";
import toast from "react-hot-toast";

const ClassesList = ({ refetchs }) => {
  const dispatch = useDispatch();
  const [openFlag, setOpenFlag] = useState(false);
  const [fullData, setFullData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(10);
  const [modalBoxFlag, setModalBoxFlag] = useState(false);
  const state = useSelector((state) => state);
  const { classesListSlice, buildingSlice } = state;
  const { classesList, clasesRoomDetail } = classesListSlice;
  const { buildingData } = buildingSlice;
  const [clasesRoomDataArray, setClassRoomDataArray] = useState(null);
  const [btnTextContent, setBtnContentText] = useState("");
  const [insertDateData, setInsertDateData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const headerData = [
    "آیدی",
    "نام کلاس",
    "ظرفیت",
    "نام ساختمان",
    "تاریخ ایجاد",
    "اقدام",
  ];

  // get clases list data
  const {
    data,
    isLoading,
    isSuccess,
    refetch: getClasesListRefetch,
  } = getClasseListData("getClassesLisData", "/ClassRoom");

  if (isLoading) {
    console.log("getClasesListRefetch");
  }

  // get department data
  const {
    data: departmentData,
    isLoading: getDepartmentLoading,
    isSuccess: getDepartmentSucces,
    refetch: getDepartmentRefetch,
  } = getDeparmentData("getDeparmentData", "/Department");

  if (!getDepartmentLoading) {
    dispatch(addDataToDepartmentSlice(departmentData));
  }

  // get building data
  const {
    data: buildingGetData,
    isLoading: getBuildingDataLoading,
    refetch: getBuildingRefetch,
  } = getBuildingData("buildingData", "/Building");

  if (!getBuildingDataLoading) {
    dispatch(addDataToBuildingSlice(buildingGetData));
  }

  if (!isLoading && !getDepartmentLoading) {
    console.log("loading...");
    const dataFull = addedDataToObject(data, (item) => {
      let filterDepartment = departmentData.find(
        (el) => el.buildingId === item.buildingId
      );
      const buildingName = filterDepartment?.buildingName;
      const newField = { ...item, buildingName };
      return newField;
    });
    if (!clasesRoomDataArray) {
      setClassRoomDataArray(dataFull);
    }
  }

  // change date
  const changeDate = () => {
    const data = addedDataToObject(clasesRoomDataArray, (item) => {
      const insertDate = ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian");
      const dataObj = { ...item, insertDate };
      return dataObj;
    });
    setInsertDateData(data);
  };

  useEffect(() => {
    if (clasesRoomDataArray) {
      changeDate();
    }
  }, [clasesRoomDataArray]);

  // pagination
  const changePagination = () => {
    console.log("insertDateData ==>", insertDateData);
    const paginationData = paginationCalculator(
      insertDateData,
      pageNumber,
      rowsOfPage
    );
    setSearchData(paginationData);
    setFullData(paginationData);
  };

  useEffect(() => {
    if (insertDateData) {
      changePagination();
    }
  }, [insertDateData, pageNumber, rowsOfPage]);

  const createNewUserHandler = () => setOpenFlag(!openFlag);

  const changePageHandler = (page) => {
    setPageNumber(page);
  };

  const cardClickHandler = () => {};

  const clickHandler = (inputValue) => {
    setRowsOfPage(inputValue.label);
  };

  // search handle
  const inputChangeHandler = (inputValue) => {
    const filteredData = searchData.filter(
      (el) => el.classRoomName.indexOf(inputValue) !== -1
    );
    setFullData(filteredData);
  };

  const editBtnClickHandler = (item) => {
    setModalBoxFlag(true);
    setBtnContentText("تایید");
    dispatch(addClasesRoomDetail(item));
  };

  // create and edite handle
  const { mutate: updateClasesRoomMutate } =
    useUpdateClasesRoom("updateClasesRoom");
  const { mutate: createClasesRoomMutate } = createClasesRoomPost(
    "createClasesRoomPost"
  );
  const createClasesRoomHandler = (formValue) => {
    let dataObj = {
      classRoomName: formValue.classRoomName,
      capacity: formValue.capacity,
      buildingId: formValue.buildingId,
    };
    console.log("formValue ==>", formValue);
    if (btnTextContent === "تایید") {
      dataObj = { ...dataObj, id: clasesRoomDetail?.id };
      updateClasesRoomMutate(["/ClassRoom", dataObj, "application/json"], {
        onSuccess: (data) => {
          toast.success(data.message);
          setModalBoxFlag(false);
          getClasesListRefetch();
          getDepartmentRefetch();
          getBuildingRefetch();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      dataObj = { ...dataObj, id: formValue.buildingId };
      createClasesRoomMutate(["/ClassRoom", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message);
          getClasesListRefetch();
          getDepartmentRefetch();
          getBuildingRefetch();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <div>
      <Card>
        <Col>
          <UserTable
            createNewUserHandler={createNewUserHandler}
            btnContentText={"افزودن کلاس"}
            changeSearchInput={inputChangeHandler}
            inputOptionClick={(inputValue) => clickHandler(inputValue)}
            addBtnClick={() => {
              setModalBoxFlag(!modalBoxFlag),
                dispatch(addClasesRoomDetail(null));
              setBtnContentText("ساختن");
            }}
          />
        </Col>
        <Col>
          {fullData && (
            <Export
              headers={headerData}
              dataMap={fullData}
              hasImage={false}
              titleField="id"
              fieldKeys={[
                "classRoomName",
                "capacity",
                "buildingName",
                "insertDate",
              ]}
              clickHandle={cardClickHandler}
              Btn={<p style={{ cursor: "pointer" }}> ویرایش </p>}
              btnOnClick={editBtnClickHandler}
              btnKeys={{ flag: false }}
            />
          )}
        </Col>
        <div className="d-flex justify-content-center">
          {insertDateData && (
            <SeparatedPagination
              RowsOfPage={rowsOfPage}
              totalCount={insertDateData.length}
              changePageNumber={(page) => changePageHandler(page)}
            />
          )}
        </div>
      </Card>
      <CreateClassRoom
        clasesRoomData={buildingData}
        isOpen={modalBoxFlag}
        toggle={() => setModalBoxFlag(!modalBoxFlag)}
        clasesRoomInfo={clasesRoomDetail && clasesRoomDetail}
        formOnClick={createClasesRoomHandler}
        btnTextContent={btnTextContent}
      />
    </div>
  );
};

export default ClassesList;
