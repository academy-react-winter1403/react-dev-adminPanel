import React, { useEffect, useState } from "react";
import { Card, Col } from "reactstrap";
import UserTable from "../../user/list/UserTable";
import Export from "../../../@core/components/common/Export/Export";
import {
  getDeparmentData,
  useDepartmentPost,
  useUpdateListOfSections,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import { addDataToDepartmentDetail, addDataToDepartmentSlice } from "../store/actions";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import CreateDepartment from "./CreateDepartment";
import toast from "react-hot-toast";

const ListOfSections = () => {
  const dispatch = useDispatch();
  const headerData = ["آیدی", "نام بخش", "تاریخ ایجاد", "نام ساختمان", "اقدام"];
  const { departmentSlice } = useSelector((state) => state);
  const { departmentSliceData, departmentDetail } = departmentSlice;
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(12);
  const [insertDateData, setInsertDateData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [modalFlag, setModalFlag] = useState(false);
  const [createBtnText, setCreateBtnText] = useState("");
  const [searchData, setSearchData] = useState("");

  // get department data
  const { data, isLoading, refetch: getDepartmentDateRefetch } = getDeparmentData(
    "getDeparmentData",
    "/Department"
  );
  if (!isLoading) {
    dispatch(addDataToDepartmentSlice(data));
  }

  // change date
  const changeDate = () => {
    const data = addedDataToObject(departmentSliceData, (item) => {
      const insertDate = ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian");
      const dataObj = { ...item, insertDate };
      return dataObj;
    });
    setInsertDateData(data);
  };

  useEffect(() => {
    if (departmentSliceData) {
      changeDate();
    }
  }, [departmentSliceData]);

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

  const changePageHandler = (pageCount) => {
    setPageNumber(pageCount);
  };

  const inputOptionClickHandler = (inputValue) => {
    setRowsOfPage(inputValue.label);
  };

  const editeClickHandler = (item) => {
    setModalFlag(true);
    setCreateBtnText("تایید");
    dispatch(addDataToDepartmentDetail(item))
  };

  // search handle
  const searchHandler = (searchValue) => {
    const filteredData = searchData.filter(
      (el) => el.depName.indexOf(searchValue) !== -1
    );
    setFullData(filteredData);
  };

  // handle create and edite
  const {mutate: updateDepartmentMutate} = useUpdateListOfSections("updateDepartment")
  const { mutate: postDepartmentMutate } = useDepartmentPost("postDepartment")
  const createOrEditeDepartmentDataHandler = (formValue) => {
    const dataObj = {
      id: formValue.buildingId,
      depName: formValue.classRoomName,
      buildingId: formValue.buildingId
    }
    if (createBtnText === "تایید") {
      console.log(dataObj)
      updateDepartmentMutate(["/Department", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message)
          setModalFlag(false)
          getDepartmentDateRefetch()
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }else {
      postDepartmentMutate(["/Department", dataObj], {
        onSuccess: (data) => {
          setModalFlag(false)
          getDepartmentDateRefetch()
        }
      })
    }
  };

  return (
    <div>
      <Card>
        <Col>
          <UserTable
            createNewUserHandler={""}
            btnContentText={"افزودن بخش"}
            changeSearchInput={searchHandler}
            inputOptionClick={(inputValue) =>
              inputOptionClickHandler(inputValue)
            }
            addBtnClick={() => {
              setModalFlag(!modalFlag);
              setCreateBtnText("ساختن");
              dispatch(addDataToDepartmentDetail(null));
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
              fieldKeys={["depName", "insertDate", "buildingName"]}
              // clickHandle={""}
              Btn={<p style={{ cursor: "pointer" }}> ویرایش </p>}
              btnOnClick={editeClickHandler}
              btnKeys={{ flag: false }}
            />
          )}
        </Col>
        <div className="d-flex justify-content-center">
          <SeparatedPagination
            RowsOfPage={rowsOfPage}
            totalCount={departmentSliceData?.length}
            changePageNumber={(page) => changePageHandler(page)}
          />
        </div>
      </Card>
      {departmentSliceData && (
        <CreateDepartment
          departmentInfo={departmentDetail}
          isOpen={modalFlag}
          toggle={() => setModalFlag(!modalFlag)}
          clasesRoomData={departmentSliceData}
          formOnClick={createOrEditeDepartmentDataHandler}
          createBtnContentText={createBtnText}
        />
      )}
    </div>
  );
};

export default ListOfSections;
