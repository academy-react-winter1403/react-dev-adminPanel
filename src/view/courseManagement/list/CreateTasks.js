import React, { useEffect, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import ModalForm from "../../../@core/components/common/modals/ModalForm";
import UserTable from "../../user/list/UserTable";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import Export from "../../../@core/components/common/Export/Export";
import {
  createAssistanceWork,
  getAssistanceWorkData,
  getCourseAssistanceWithId,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToAssistanceWorkSingrlState,
  addDataToAssistanceWorkState,
} from "../store/actions";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import toast from "react-hot-toast";

const CreateTasks = () => {
  const dispatch = useDispatch();
  const { assistanceWorkDataSlice } = useSelector((state) => state);
  const { assistanceWorkData, assistanceWorkDataSingelData } =
    assistanceWorkDataSlice;
  const [modalFlag, setModalFlag] = useState(false);
  const [fullData, setFullData] = useState(null);
  const [paginationData, setPaginationData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [searchData, setSearchData] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const inputRowsOfPageData = [
    { value: "", label: 8 },
    { value: "", label: 15 },
    { value: "", label: 30 },
  ];

  const headerData = ["نام دوره", "منتور", "تاریخ ایجاد", "عملیات"];

  // get assistance work data
  const { data, isLoading, refetch } = getAssistanceWorkData(
    "getAssistanceWorkData",
    "/CourseAssistance"
  );

  if (!isLoading) {
    dispatch(addDataToAssistanceWorkState(data));
    console.log(data);
  }

  // chenga pagination and change moment
  const changeData = () => {
    const changeMomentData = addedDataToObject(assistanceWorkData, (item) => {
      const insertDate = ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian");
      const dataObj = { ...item, insertDate };
      return dataObj;
    });
    const paginationData = paginationCalculator(
      changeMomentData,
      pageNumber,
      rowsOfPage
    );
    setTotalCount(changeMomentData.length);
    setFullData(paginationData);
    setSearchData(paginationData);
    setPaginationData(paginationData);
  };

  const searchHandler = (searchValue) => {
    console.log("searchValue ==>", searchValue.target.value);
    const filteredData = searchData.filter(
      (el) => el.courseName.indexOf(searchValue.target.value) !== -1
    );
    setFullData(filteredData)
    // console.log(filteredData);
    // if (filteredData.length > 0) {
    //   setFullData(filteredData);
    //   setTotalCount(fullData.length);
    // } else if (filteredData.length === 0 && searchValue.target.value !== "") {
    //   setFullData([]);
    //   setTotalCount(fullData.length);
    // }
    // if (searchValue.target.value === "") {
    //   setFullData(paginationData);
    //   setTotalCount(assistanceWorkData?.length);
    // }
    // changeData()
    // setTotalCount(fullData.length);
  };

  useEffect(() => {
    if (assistanceWorkData) {
      changeData();
    }
  }, [assistanceWorkData, pageNumber, rowsOfPage]);

  const clickBtn = (
    <Button
      type="button"
      className="px-0 text-center bg-black btn btn-primary"
      style={{ width: "60px", paddingBlock: "6px" }}
    >
      انتخاب
    </Button>
  );

  const { mutate, data: courseAssistanceSingelData } =
    getCourseAssistanceWithId("getCourseAssistanceWithId");
  const exportBtnClickHandler = (item) => {
    mutate([`/CourseAssistance/${item.id}`], {
      onSuccess: (data) => {
        console.log(data);
        dispatch(addDataToAssistanceWorkSingrlState(data));
      },
    });
  };

  const { mutate: createAssistanceWorkMutate } = createAssistanceWork(
    "createAssistanceWork"
  );
  const formSubmitHandler = (formValue) => {
    console.log("formValue ==>", formValue);
    const dataObj = {
      worktitle: formValue.worktitle,
      workDescribe: formValue.workDescribe,
      assistanceId: formValue.assistanceId,
      workDate: formValue.workDate,
    };
    createAssistanceWorkMutate(["/AssistanceWork", dataObj], {
      onSuccess: (data) => {
        console.log("created assistance work😍😍==>", data);
        refetch();
        toast.success(data.message);
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="left" style={{ width: "45%" }}>
          <CreateTaskForm
            btnTextContent={"ثبت"}
            cahngeModalFlag={() => setModalFlag(!modalFlag)}
            title={"افزودن تسک"}
            formSubmitHandle={formSubmitHandler}
            formData={assistanceWorkDataSingelData}
          />
        </div>
        <div className="right" style={{ width: "50%" }}>
          <div
            className="top-control"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Col md="3">
              <Input
                type="select"
                onChange={(pageNum) => setRowsOfPage(pageNum.target.value)}
              >
                {inputRowsOfPageData.map((item, index) => (
                  <option key={index}>{item.label}</option>
                ))}
              </Input>
            </Col>
            <Col md="6">
              <InputGroupButtons onChange={searchHandler} />
            </Col>
          </div>
          <div className="bottom">
            {fullData && (
              <Export
                headers={headerData}
                dataMap={fullData}
                titleField="courseName"
                fieldKeys={["assistanceName", "insertDate"]}
                Btn={clickBtn}
                btnOnClick={exportBtnClickHandler}
                btnKeys={{ flag: false }}
              />
            )}
          </div>
            <SeparatedPagination
              RowsOfPage={rowsOfPage}
              totalCount={assistanceWorkData?.length}
              changePageNumber={(pageNum) => setPageNumber(pageNum)}
            />
        </div>
      </div>
      <Modal
        isOpen={modalFlag}
        toggle={() => setModalFlag(!modalFlag)}
        style={{ marginTop: "198px" }}
      >
        <ModalHeader>
          <label style={{ fontSize: "18px", fontFamily: "tahoma" }}>
            راهنمای انتخاب منتور
          </label>
        </ModalHeader>
        <ModalBody className="p-3">
          <label style={{ fontSize: "18px", fontFamily: "tahoma" }}>
            میتوانید از باکس کنار (دوره ها) منتور را انتخاب کنید
          </label>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateTasks;
