import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import "../../../@core/scss/me-style/textStyle.scss";
import "../../../@core/scss/me-style/font.scss";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import UserTable from "../../user/list/UserTable";
import Export from "../../../@core/components/common/Export/Export";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseDetailAdmin,
  getCourseGroupsWithIdMutation,
  getScheduleData,
} from "../../../@core/services/api";
import { http } from "../../../@core/services/interceptor";
import {
  addDataToAdminSheduleState,
  changeAdminSheduleEndDate,
  changeAdminShedulePageNumber,
  changeAdminSheduleRowsOfPage,
  changeAdminSheduleStartDate,
} from "../store/actions";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import { Edit2, Trash2 } from "react-feather";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import CreateSheduleForm from "./create/CreateSheduleForm";
import CourseModal from "../../partialComp/CourseModal";
import { addDataToSingelCourseAdmin } from "../../courseManagement/store/actions";

const AminSchedule = () => {
  const dispatch = useDispatch();
  const { adminSheduleSlice, allCourseAdminDataSlice } = useSelector(
    (state) => state
  );
  const { adminSheduleData, adminSheduleSingelData, adminSheduleQuery } =
    adminSheduleSlice;
  const { startDate, endDate, PageNumber, RowsOfPage } = adminSheduleQuery;
  const { singelCourseAdmin } = allCourseAdminDataSlice;
  const [courseId, setCourseId] = useState(null);
  const [groupNameArray, setGroupNameArray] = useState(null);

  const [fullData, setFullData] = useState([]);
  const [createScheduleFormIsOpen, setCreateScheduleFormIsOpen] =
    useState(false);
  const [courseModalIsOpen, setCourseModalIsOpen] = useState(false);

  // btn action data
  const btnActionData = [
    { title: "ویرایش", icon: <Edit2 size={14} className="cursor-pointer" /> },
    { title: "حذف", icon: <Trash2 size={14} className="cursor-pointer" /> },
  ];

  //get shedule data
  const {
    data: sheduleData,
    isLoading: sheduleDataLoading,
    refetch: refetchSheduleData,
  } = getScheduleData("getAdminSheduleData", "/Schedual/GetAdminScheduals", {
    startDate,
    endDate,
    PageNumber,
    RowsOfPage,
  });

  if (!sheduleDataLoading) {
    console.log("sheduleData ==>", sheduleData);
    dispatch(addDataToAdminSheduleState(sheduleData));
  }

  const changeData = () => {
    const fullDate = addedDataToObject(adminSheduleData, (item) => {
      const newDate = `${item.startTime} تا ${item.endTime}`;
      const newCalender = ChangeMoment(item.startDate, "YYYY/MM/DD", "persian");
      return { ...item, fullDate: newDate, newCalender: newCalender };
    });
    // console.log("fullDate ==>", fullDate);
    const paginationData = paginationCalculator(
      fullDate,
      PageNumber,
      RowsOfPage
    );
    setFullData(paginationData);
  };

  useEffect(() => {
    console.log("ejra shod :)");
    if (adminSheduleData) {
      changeData();
    }
  }, [adminSheduleData, startDate, endDate, PageNumber, RowsOfPage]);

  useEffect(() => {
    refetchSheduleData();
  }, [startDate, endDate]);

  const startTimeFilterHandler = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    // console.log(gregorianDate);
    dispatch(changeAdminSheduleStartDate(gregorianDate));
  };

  const endTimeFilterHandler = (date) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    dispatch(changeAdminSheduleEndDate(gregorianDate));
  };

  const headerData = [
    "نام گروه",
    "ساعت شروع / پایان",
    "تعداد در هفته",
    "تاریخ",
    "حالت دوره",
    "حالت حضور",
    "اقدام",
  ];

  const inputrowsOfPageClickHandler = (rowsOfPage) => {
    console.log("rowsOfPage ==>", rowsOfPage);
    dispatch(changeAdminSheduleRowsOfPage(rowsOfPage.label));
  };

  const courseBtnClickHandler = (item) => {
    console.log("item ==>", item);
    dispatch(addDataToSingelCourseAdmin(item));
    setCourseId(item.courseId);
  };

  const { data: courseDetailData, isLoading: courseDetailDataLoading } =
    getCourseDetailAdmin(
      "getCourseDetailData",
      `/Course/${courseId}`,
      courseId ? true : false
    );

  let groupNameDataArray = [];
  if (!courseDetailDataLoading) {
    console.log("courseDetailData ==>", courseDetailData);
    if (courseDetailData) {
      // alert("")
      courseDetailData.forEach((item) => {
        const isValidation = groupNameDataArray.includes(
          item.courseGroupDto.groupName
        );
        if (!isValidation) {
          groupNameDataArray.push(item.courseGroupDto.groupName);
        }
        console.log("isValidation ==>", isValidation);
      });
      if (!groupNameArray) {
        setGroupNameArray(groupNameDataArray);
      }
    }

    // const isValidation = groupNameDataArray.includes(
    //   item.courseGroupDto.groupName
    // );
    // if (!isValidation) {
    //   groupNameDataArray.push(item.courseGroupDto.groupName);
    // }
    // console.log("isValidation ==>", isValidation);

  }

  if (!createScheduleFormIsOpen) {
    groupNameDataArray = []
  }

  return (
    <Card
      style={{
        display: "flex",
        // justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "start",
      }}
      className="bg-transparent"
    >
      <Card className="w-100">
        <CardHeader
          className="flex-row justify-content-center align-items-start"
          style={{ fontSize: "20px" }}
        >
          <label>فیلتر</label>
        </CardHeader>
        <CardBody
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <Col md="4">
            <label>تایم شروع</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              onChange={startTimeFilterHandler}
              containerStyle={{
                width: "100%",
                marginTop: "8px",
              }}
              format="YYYY/MM/DD"
              style={{
                width: "100%",
                height: "39px",
                paddingLeft: "14px",
                paddingRight: "14px",
              }}
              className="datePicker"
              placeholder="۱۴۰۴/۰۳/۱۸"
            />
          </Col>
          <Col md="4">
            <label>تایم پایان</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              onChange={endTimeFilterHandler}
              containerStyle={{
                width: "100%",
                marginTop: "8px",
              }}
              format="YYYY/MM/DD"
              style={{
                width: "100%",
                height: "39px",
                paddingLeft: "14px",
                paddingRight: "14px",
              }}
              className="datePicker"
              placeholder="۱۴۰۴/۰۳/۲۸"
            />
          </Col>
          <Col md="3">
            <button
              style={{ width: "100%", position: "relative", top: "10px" }}
              type="button"
              class="btn btn-primary"
              onClick={() =>
                setCreateScheduleFormIsOpen(!createScheduleFormIsOpen)
              }
            >
              افزودن بازه زمانی
            </button>
          </Col>
        </CardBody>
      </Card>
      <Card className="w-100">
        <UserTable inputOptionClick={inputrowsOfPageClickHandler} />
        {fullData && (
          <Export
            headers={headerData}
            dataMap={fullData}
            titleField="groupName"
            fieldKeys={[
              "fullDate",
              "weekNumber",
              "newCalender",
              { keyName: "courseStatus" },
              { keyName: "lockToRaise" },
            ]}
            statusKey={{
              courseStatus: {
                statusName: "forming",
                falseField: "برگزار نشده",
                trueField: "برگزار شده",
              },
              lockToRaise: {
                statusName: "lockToRaise",
                falseField: "حضوری نیست",
                trueField: "حضوری هست",
              },
            }}
            Btn={
              <ButtonAction dataArray={btnActionData} leftPosNum={"150px"} />
            }
          />
        )}
        <CardFooter>
          {adminSheduleData && (
            <SeparatedPagination
              totalCount={adminSheduleData.length}
              RowsOfPage={RowsOfPage}
              changePageNumber={(pageNumber) =>
                dispatch(changeAdminShedulePageNumber(pageNumber))
              }
            />
          )}
        </CardFooter>
      </Card>
      {
        <CreateSheduleForm
          isOpen={createScheduleFormIsOpen}
          toggle={() => setCreateScheduleFormIsOpen(!createScheduleFormIsOpen)}
          setModalFlag={setCourseModalIsOpen}
          groupNameArray={groupNameArray ? groupNameArray : []}
        />
      }
      <CourseModal
        isOpen={courseModalIsOpen}
        toggle={() => setCourseModalIsOpen(false)}
        btnOnClick={courseBtnClickHandler}
      />
    </Card>
  );
};

export default AminSchedule;
