import InputNumber from "rc-input-number";
import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Minus, Plus } from "react-feather";
import DatePicker from "react-multi-date-picker";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import "../../../../@core/scss/me-style/font.scss";
import { useFormik } from "formik";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { addedDataToObject } from "../../../../@core/hooks";

const CreateSheduleForm = ({ isOpen, toggle, setModalFlag, groupNameArray }) => {
    const {singelCourseAdmin} = useSelector((state) => state.allCourseAdminDataSlice)
  const [inputOptionData, setInputOptionData] = useState([
    { value: "", label: "ابتدا دوره را انتخاب نمایید" },
  ]);

  const newGroupNameArray = addedDataToObject(groupNameArray, (item) => {
    return {value: "", label: item}
  })

  useEffect(() => {
    if (groupNameArray) {
      setInputOptionData(newGroupNameArray)
    }
  }, [groupNameArray])

  console.log("newGroupNameArray ==>", newGroupNameArray)

  const startTimeFilterHandler = (date, section) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    formik.setFieldValue(section, gregorianDate);
  };

  const initialValues = {
    createSchedule: "",
    courseName: singelCourseAdmin ? singelCourseAdmin.fullName : "",
    courseGroupName: "",
    courseGroupId: "",
    startDate: "",
    startTime: "",
    endTime: "",
    weekNumber: "",
    rowEffect: "",
    scheduleType: "",
    scheduleStatus: "",
  };

  const validation = yup.object({
    // createSchedule: yup.string().required("وارد کردن این فیلد الزامی است"),
    courseGroupName: yup.string().required("وارد کردن این فیلد الزامی است"),
    courseName: yup.string().required("وارد کردن این فیلد الزامی است"),
    startDate: yup.string().required("وارد کردن این فیلد الزامی است"),
    startTime: yup.string().required("وارد کردن این فیلد الزامی است"),
    endTime: yup.string().required("وارد کردن این فیلد الزامی است"),
    weekNumber: yup.string().required("وارد کردن این فیلد الزامی است"),
    rowEffect: yup.string().required("وارد کردن این فیلد الزامی است"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggle}>
        <h1> ساخت بازه زمانی </h1>
      </ModalHeader>
      <ModalBody
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Col md="12" className="d-flex flex-row justify-content-center gap-3">
          <div className="form-check">
            <Input
              type="radio"
              id="ex1-active"
              name="createSchedule"
              defaultChecked
              onChange={formik.handleChange}
            />
            <Label className="form-check-label" for="ex1-active">
              ساخت دستی
            </Label>
          </div>
          <div className="form-check">
            <Input
              type="radio"
              name="createSchedule"
              id="ex1-inactive"
              onChange={formik.handleChange}
            />
            <Label className="form-check-label" for="ex1-inactive">
              ساخت اتوماتیک
            </Label>
          </div>
        </Col>
        <Col>
          <Label>انتخاب دوره</Label>
          <Input
            type="text"
            placeholder="نام دوره را انتخاب کنید"
            name="courseName"
            value={formik.values.courseName}
            onChange={(event) => {setModalFlag(true), formik.handleChange(event)}}
            className={formik.errors.courseName ? "is-invalid" : ""}
          />
          {
            formik.errors.courseName && <p className="text-danger">{formik.errors.courseName}</p>
          }
        </Col>
        <Col>
          <Label>گروه دوره</Label>
          <Input
            type="select"
            name="courseGroupName"
            value={formik.values.courseGroupName}
            onChange={formik.handleChange}
            className={formik.errors.courseGroupName ? "is-invalid" : ""}
          >
            {
                formik.errors.courseGroupName && <p className="text-danger">{formik.errors.courseGroupName}</p>
            }
            {groupNameArray.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </Input>
        </Col>
        <Col>
          <Label>تاریخ شروع</Label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => startTimeFilterHandler(date, "startDate")}
            name="startDate"
            value={formik.values.startDate}
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
            className={formik.errors.startDate ? "is-invalid datePicker" : "datePicker"}
            placeholder="۱۴۰۴/۰۳/۱۸"
          />
        </Col>
        <Col className="d-flex flex-row justify-content-between">
          <Col md="5" className="d-flex flex-row gap-3">
            <Row className="w-50">
              <Label className="form-label" for="basic-number-input">
                تعداد جلسات در هفته
              </Label>
              <Input
                type="number"
                name="weekNumber"
                value={formik.values.weekNumber}
                onChange={formik.handleChange}
                className={formik.errors.weekNumber ? "is-invalid" : ""}
              />
              {
                formik.errors.weekNumber && <label className="text-danger">{formik.errors.weekNumber}</label>
              }
            </Row>
            <Row className="w-50">
              <Label> تعداد کل جلسات </Label>
              <Input
                type="number"
                name="rowEffect"
                value={formik.values.rowEffect}
                onChange={formik.handleChange}
                className={formik.errors.rowEffect ? "is-invalid" : ""}
              />
              {
                formik.errors.rowEffect && <label className="text-danger">{formik.errors.rowEffect}</label>
              }
            </Row>
          </Col>
          <Col md="5" className="d-flex flex-row gap-3">
            <Row className="w-50">
              <Label className="form-label" for="basic-number-input">
                تابم شروع
              </Label>
              <Input
                type="number"
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                className={formik.errors.startTime ? "is-invalid" : ""}
              />
              {
                formik.errors.startTime && <label className="text-danger">{formik.errors.startTime}</label>
              }
            </Row>
            <Row className="w-50">
              <Label>ساعت پایان</Label>
              <Input
                type="number"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                className={formik.errors.endTime ? "is-invalid" : ""}
              />
              {
                formik.errors.endTime && <label className="text-danger">{formik.errors.endTime}</label>
              }
            </Row>
          </Col>
        </Col>
        <Col className="d-flex flex-row justify-content-center">
          <Row className="flex flex-row justify-content-center">
            <Label className="form-check-label mb-50 text-center">
              حالت برگزاری کلاس
            </Label>
            <div
              className="form-switch form-check-primary form-check-success"
              style={{ width: "100px" }}
            >
              <Input
                type="switch"
                defaultChecked
                id="icon-primary"
                name="scheduleType"
                style={{ width: "82px" }}
                onChange={formik.handleChange}
              />
            </div>
          </Row>
          <Row className="flex flex-row justify-content-center">
            <Label className="form-check-label mb-50 text-center">
              وضعیت حضوری بودن یا غیر حضوری بودن
            </Label>
            <div
              className="form-switch form-check-primary form-check-success"
              style={{ width: "100px" }}
            >
              <Input
                type="switch"
                defaultChecked
                id="icon-primary"
                name="scheduleStatus"
                style={{ width: "82px" }}
                onChange={formik.handleChange}
              />
            </div>
          </Row>
        </Col>
        <Col className="d-flex flex-row gap-1">
          <Button
            color="btn btn-primary"
            type="submit"
            onClick={formik.handleSubmit}
          >
            ثبت
          </Button>
          <Button
            color="btn btn-outline-secondary"
            type="reset"
            onClick={toggle}
            className="px-3"
          >
            لفو
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default CreateSheduleForm;
