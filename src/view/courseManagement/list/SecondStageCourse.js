// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../@core/services/api";
import {
  setClassRoom,
  setCourseLevel,
  setCourseType,
  setPrerequisite,
  setTeachers,
  setTerm,
} from "../store/createCourseFilterSlice";
import { setCourseInfoStepTwo } from "../store/allDataAddCourse";
import { columns } from "./../../../@core/components/constant/user/columns";

const SecondStageCourse = ({ stepper }) => {
  // ** Yup Validation Schema
  const validationSchema = Yup.object().shape({
    Capacity: Yup.string().required("ظریفت دوره الزامی است"),
    SessionNumber: Yup.string().required("تعداد جلسات الزامی است"),
    Cost: Yup.string().required("قیمت دوره الزامی است"),
  });

  // ** Default Values
  const defaultValues = {
    Capacity: "",
    SessionNumber: "",
    Cost: "",
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const { courseType, courseLevel, classRoom, teachers, term, prerequisite } =
    useSelector((state) => state.createCourseFilterSlice);

  const onSubmit = (data) => {
    const combinedData = {
      ...data,
      CourseTypeId: currentCourseType.value,
      CourseLvlId: currentCourseLevel.value,
      TeacherId: currentTeachers.value,
      ClassId: currentClassRoom.value,
      CoursePrerequisiteId: currentPrerequisite.value,
      TremId: currentTerm.value,
    };
    console.log(combinedData);
    dispatch(setCourseInfoStepTwo(combinedData));
    stepper.next();
  };

  // ** api call
  const { data, isLoading } = getData("ApiGetList", "/Course/GetCreate");
  useEffect(() => {
    if (!isLoading && data) {
      console.log("this is data", data);
      dispatch(
        setCourseType(
          data.courseTypeDtos.map((item) => ({
            value: item.id,
            label: item.typeName,
          }))
        )
      );
      dispatch(
        setCourseLevel(
          data.courseLevelDtos.map((item) => ({
            value: item.id,
            label: item.levelName,
          }))
        )
      );
      dispatch(
        setTeachers(
          data.teachers.map((item) => ({
            value: item.teacherId,
            label: item.fullName,
          }))
        )
      );
      dispatch(
        setClassRoom(
          data.classRoomDtos.map((item) => ({
            value: item.id,
            label: item.classRoomName,
          }))
        )
      );
      dispatch(
        setTerm(
          data.termDtos.map((item) => ({
            value: item.id,
            label: item.termName,
          }))
        )
      );

      console.log(courseType);
    }
  }, [data, isLoading]);
  const { data: courseData, isLoading: courseIsLoading } = getData(
    "GetList",
    "/Course/CourseList?RowsOfPage=762"
  );
  useEffect(() => {
    if (!courseIsLoading && courseData) {
      console.log(
        "this is data",
        courseData.courseDtos.filter((item) => item.isActive)
        .map((item) => ({ value: item.courseId, label: item.title }))
      );
      dispatch(
        setPrerequisite(
          courseData.courseDtos
            .filter((item) => item.isActive)
            .map((item) => ({ value: item.courseId, label: item.title }))
        )
      );
    }
  }, [courseIsLoading, courseData]);
  useEffect(() => {
    if (courseType.length > 0) {
      setCurrentCourseType(courseType[0]);
    }
    if (courseLevel.length > 0) {
      setCurrentCourseLevel(courseLevel[0]);
    }
    if (teachers.length > 0) {
      setCurrentTeachers(teachers[0]);
    }
    if (classRoom.length > 0) {
      setCurrentClassRoom(classRoom[0]);
    }
    if (prerequisite.length > 0) {
      setCurrentPrerequisite(prerequisite[0]);
    }
    if (term.length > 0) {
      setCurrentTerm(term[0]);
    }
  }, [courseType, courseLevel, teachers, classRoom, prerequisite, term]);
  // ** States
  const [currentCourseType, setCurrentCourseType] = useState({});
  const [currentCourseLevel, setCurrentCourseLevel] = useState({});
  const [currentTeachers, setCurrentTeachers] = useState({});
  const [currentClassRoom, setCurrentClassRoom] = useState({});
  const [currentPrerequisite, setCurrentPrerequisite] = useState({});
  const [currentTerm, setCurrentTerm] = useState({});

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="4">
                <Label for="role-select">نحوه دوره</Label>
                <Select
                  isClearable={false}
                  value={currentCourseType}
                  options={courseType}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    setCurrentCourseType(data);
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="4">
                <Label for="plan-select">سطح دوره</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={courseLevel}
                  value={currentCourseLevel}
                  onChange={(data) => {
                    setCurrentCourseLevel(data);
                  }}
                />
              </Col>
              <Col md="4">
                <Label for="status-select">مدرس دوره</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={teachers}
                  value={currentTeachers}
                  onChange={(data) => {
                    setCurrentTeachers(data);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label for="role-select">کلاس ها</Label>
                <Select
                  isClearable={false}
                  value={currentClassRoom}
                  options={classRoom}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    setCurrentClassRoom(data);
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="4">
                <Label for="plan-select">کلاس پیش نیاز</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={prerequisite}
                  value={currentPrerequisite}
                  onChange={(data) => {
                    setCurrentPrerequisite(data);
                  }}
                />
              </Col>
              <Col md="4">
                <Label for="status-select">ترم</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={term}
                  value={currentTerm}
                  onChange={(data) => {
                    setCurrentTerm(data);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="Capacity">
                  ظرفیت دوره
                </Label>
                <Controller
                  name="Capacity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      rows="3"
                      placeholder="ظرفیت کلاس را وارد کنید"
                      invalid={!!errors.Capacity}
                      {...field}
                    />
                  )}
                />
                {errors.Capacity && (
                  <FormFeedback>{errors.Capacity.message}</FormFeedback>
                )}
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="Cost">
                  قیمت دوره
                </Label>
                <Controller
                  name="Cost"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      rows="3"
                      placeholder="قیمت دوره را وارد کنید"
                      invalid={!!errors.Cost}
                      {...field}
                    />
                  )}
                />
                {errors.Cost && (
                  <FormFeedback>{errors.Cost.message}</FormFeedback>
                )}
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="SessionNumber">
                  تعداد جلسه
                </Label>
                <Controller
                  name="SessionNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      rows="3"
                      placeholder="تعداد جلسات را وارد کنید"
                      invalid={!!errors.SessionNumber}
                      {...field}
                    />
                  )}
                />
                {errors.SessionNumber && (
                  <FormFeedback>{errors.SessionNumber.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button
                type="button"
                color="primary"
                className="btn-prev"
                onClick={() => stepper.previous()}
              >
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  مرحله قبلی
                </span>
              </Button>
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  مرحله بعدی
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SecondStageCourse;
