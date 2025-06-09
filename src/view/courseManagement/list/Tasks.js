import React, { useEffect, useState } from "react";
import UserTable from "../../user/list/UserTable";
import Export from "../../../@core/components/common/Export/Export";
import {
  getAssistanceWorkData,
  getCourseAssistanceWithId,
  getWorkData,
  updateTasks,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    addDataToAssistanceWorkSingrlState,
  addDataToAssistanceWorkState,
  addDataToWorkSingelData,
  addDataToWorkState,
} from "../store/actions";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
// import CreateTasks from "./CreateTaskForm";
import {
  Button,
  Card,
  FormText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import TasksEditeForm from "./TasksEditeForm";
import toast from "react-hot-toast";

const Tasks = () => {
  const dispatch = useDispatch();
  const { workDataSlice, assistanceWorkDataSlice } = useSelector(
    (state) => state
  );
  const { workData, workSingelData } = workDataSlice;
  const { assistanceWorkData, assistanceWorkDataSingelData } =
    assistanceWorkDataSlice;
  const [fullData, setFullData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(12);
  const [modalFlag, setModalFlag] = useState(false);
  const [workModalFlag, setWorkModalFlag] = useState(false);

  // work data state
  const [workFullDate, setWorkFullData] = useState(null);
  const [workDataPageNumber, seWorkDataPageNumber] = useState(0);
  const [workDataRowsOfPage, setWorkDataRowsOfPage] = useState(10);
  // work data state

  const headerData = [
    "اسم تسک",
    "توضیحات",
    "تاریخ تسک",
    "نام دوره",
    "منتور",
    "اقدام",
  ];

  const workHeaderTitle = ["نام دوره", "منتور", "تاریخ ایجاد", "عملیات"];

  const { data, isLoading, refetch } = getWorkData(
    "getWorkData",
    "/AssistanceWork"
  );

  if (!isLoading) {
    // console.log("work data ==>", data)
    dispatch(addDataToWorkState(data));
  }

  // get assistance work data
  const { data: assistanceWorkGetData, isLoading: assistanceWorkDataLoading } =
    getAssistanceWorkData("getAssistanceWorkData", "/CourseAssistance");

  if (!assistanceWorkDataLoading) {
    dispatch(addDataToAssistanceWorkState(assistanceWorkGetData));
    console.log(data);
  }

  // change pagination
  const changePagination = () => {
    const paginationData = paginationCalculator(
      workData,
      pageNumber,
      rowsOfPage
    );
    const chnageDate = addedDataToObject(paginationData, (itme) => {
      const newDate = ChangeMoment(itme.workDate, "YYYY/MM/DD", "persian");
      const dataObj = { ...itme, workDate: newDate };
      return dataObj;
    });
    setFullData(chnageDate);
    setSearchData(chnageDate);
  };

  useEffect(() => {
    if (workData) {
      changePagination();
    }
  }, [workData, pageNumber, rowsOfPage]);

  // change work data paginatoin
  const changeWorkDataPagination = () => {
    const newData = addedDataToObject(assistanceWorkData, (item) => {
      const workDate = ChangeMoment(item.workDate, "YYYY/MM/DD", "persian");
      const dataObj = { ...item, workDate };
      return dataObj;
    });
    const paginationData = paginationCalculator(
      newData,
      workDataPageNumber,
      workDataRowsOfPage
    );
    setWorkFullData(paginationData);
  };
  useEffect(() => {
    if (assistanceWorkData) {
      changeWorkDataPagination();
    }
  }, [assistanceWorkData, workDataPageNumber]);
  // change work data paginatoin

  const { mutate, data: courseAssistanceSingelData } =
    getCourseAssistanceWithId("getCourseAssistanceWithId");
  const createTaskHandler = (item) => {
    console.log(item);
    mutate([`/AssistanceWork/${item.workId}`], {
      onSuccess: (data) => {
        console.log("daaaaaaaaaaaa", data)
        dispatch(addDataToWorkSingelData(data));
      },
      onError: (error) => {
        // console.log(error)
      },
    });
    // dispatch(addDataToWorkSingelData(item));
    setModalFlag(!modalFlag);
  };

  // search hadnler
  const searchHandler = (inputValue) => {
    const filteredData = searchData.filter(
      (el) => el.worktitle.indexOf(inputValue) !== -1
    );
    setFullData(filteredData);
  };

  console.log("fullData ==>", fullData);

  const editeElem = (
    <div>
      <span> ویرایش </span>
      <FormText />
    </div>
  );

  const clickBtn = (
    <Button
      type="button"
      className="px-0 text-center bg-black btn btn-primary"
      style={{ width: "60px", paddingBlock: "6px" }}
    >
      انتخاب
    </Button>
  );

  const { mutate: getAssistanceSingelData } = getCourseAssistanceWithId(
    "getCourseAssistanceWithId"
  );
  const workBtnClickHandler = (item) => {
    console.log("work item... ", item);
    setWorkModalFlag(!workModalFlag)
    mutate([`/CourseAssistance/${item.id}`], {
      onSuccess: (data) => {
        const newData = {...data, assistanceId: workSingelData.id}
        dispatch(addDataToAssistanceWorkSingrlState(newData));
      },
    });
  };

  const {mutate: updateTasksPut} = updateTasks("updateTasks")
  const formEditeSubmitHandler = (formValue) => {
    console.log("edite form value ==>", formValue)
    const dataObj = {
        worktitle: formValue.worktitle,
        workDescribe: formValue.workDescribe,
        assistanceId: formValue.assistanceId,
        workDate: formValue.workDate,
        id: formValue.id
    }
    console.log("dataObj ==>", dataObj)
    updateTasksPut(["/AssistanceWork", dataObj], {
        onSuccess: (data) => {
            toast.success(data.message)
            setModalFlag(!modalFlag)
            refetch()
        }
    })
  }

  return (
    <div>
      <UserTable
        btnContentText={"افزودن تسک"}
        addBtnClick={createTaskHandler}
        inputOptionClick={(inputValue) => setRowsOfPage(inputValue.label)}
        changeSearchInput={searchHandler}
      />
      <Card>
        {fullData && (
          <Export
            headers={headerData}
            dataMap={fullData}
            titleField="worktitle"
            fieldKeys={[
              "workDescribe",
              "workDate",
              "courseName",
              "assistanceName",
            ]}
            Btn={editeElem}
            statusName={"ویرایش"}
            btnOnClick={createTaskHandler}
            hover={true}
          />
        )}
      </Card>
      <SeparatedPagination
        totalCount={workData?.length}
        RowsOfPage={rowsOfPage}
        changePageNumber={(pageNum) => setPageNumber(pageNum)}
      />
      <TasksEditeForm
        isOpen={modalFlag}
        toggle={() => setModalFlag(!modalFlag)}
        btnTextContent={"ثبت"}
        formData={{workSingelData, assistanceWorkDataSingelData}}
        cahngeModalFlag={() => setWorkModalFlag(!workModalFlag)}
        title={"ویرایش تسک"}
        formSubmitHandle={formEditeSubmitHandler}
      />
      <Modal
        isOpen={workModalFlag}
        style={{ width: "100%" }}
        toggle={() => {
            setWorkModalFlag(!workModalFlag)
            dispatch(addDataToAssistanceWorkSingrlState(null));
        }}
      >
        <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
          <label>انتخاب دوره</label>
        </ModalHeader>
        <ModalBody>
          {workFullDate && (
            <Export
              headers={workHeaderTitle}
              dataMap={workFullDate}
              titleField="courseName"
              fieldKeys={["assistanceName", "workDate"]}
              Btn={clickBtn}
              btnOnClick={workBtnClickHandler}
            />
          )}
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
          <SeparatedPagination
            totalCount={assistanceWorkData?.length}
            RowsOfPage={workDataRowsOfPage}
            changePageNumber={(pageNum) => seWorkDataPageNumber(pageNum)}
          />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Tasks;
