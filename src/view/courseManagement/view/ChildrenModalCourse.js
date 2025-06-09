// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  ModalFooter,
  Card,
  CardBody,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData, usePutData } from "../../../@core/services/api";
import {
  setClassRoom,
  setCourseLevel,
  setCourseType,
  setPrerequisite,
  setTeachers,
  setTerm,
} from "../store/createCourseFilterSlice";
// import { getData, usePutData } from "../../../../@core/services/api";
// import { setCategory } from "../store/NewDetailSlice";

const ChildrenModalCourse = () => {
  const [currentCategory, setCurrentCategory] = useState({});
  const [preview, setPreview] = useState(null);
  // ** Yup Validation Schema
  const validationSchema = Yup.object().shape({
    Title: Yup.string()
      .required("عنوان الزامی است")
      .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
      .max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد"),

    Describe: Yup.string()
      .required("توضیحات الزامی است")
      .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
    Image: Yup.mixed()
      .required("عکس الزامیست")
      .test("fileType", "فرمت فقط jpg یا png باشد", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
      })
      .test("fileSize", "حجم فایل باید کمتر از ۲ مگابایت باشد", (value) => {
        return value && value[0]?.size <= 2 * 1024 * 1024;
      }),
    CurrentCoursePaymentNumber: Yup.number()
      .typeError("تعداد اقساط باید عدد باشد")
      .notRequired(),
    Capacity: Yup.string().required("ظریفت دوره الزامی است"),
    SessionNumber: Yup.string().required("تعداد جلسات الزامی است"),
    Cost: Yup.string().required("قیمت دوره الزامی است"),
    StartTime: Yup.date()
      .typeError("تاریخ شروع معتبر نیست")
      .required("تاریخ شروع الزامی است"),

    EndTime: Yup.date()
      .typeError("تاریخ پایان معتبر نیست")
      .required("تاریخ پایان الزامی است"),
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Title: "",
      Describe: "",
      Capacity: "",
      Cost: "",
      StartTime: "",
      EndTime: "",
      CurrentCoursePaymentNumber: "",
      Image: null,
    },
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const { courseType, courseLevel, classRoom, teachers, term, prerequisite } =
    useSelector((state) => state.createCourseFilterSlice);

  const { CourseId } = useParams();
  const { data: EditDataCourse, isLoading: EditIsLoadingCourse } = getData(
    "Course",
    `/Course/${CourseId}`
  );

  useEffect(() => {
    if (!EditIsLoadingCourse && EditDataCourse) {
      console.log("dataForCourse", EditDataCourse);
      reset({
        Id: EditDataCourse.courseId,
        Title: EditDataCourse.title || "",
        Active: EditDataCourse.isActive,
        Describe: EditDataCourse.describe || "",
        Capacity: EditDataCourse.capacity || "",
        Cost: EditDataCourse.cost || "",
        CurrentCoursePaymentNumber:
          EditDataCourse.CurrentCoursePaymentNumber || "",
        StartTime: EditDataCourse.startTime || "",
        EndTime: EditDataCourse.endTime || "",
      });
    }
  }, [EditIsLoadingCourse, EditDataCourse]);
  // ** api call
  const { data, isLoading } = getData("ApiGetList", "/Course/GetCreate");
  useEffect(() => {
    if (!isLoading && data) {
      //   console.log("this is data", data);
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
  //   const { mutate: postDataMutate } = usePutData("postAllData");
  const onSubmit = (data) => {
    console.log("object")
    // const file = data.Image[0];
    // const AllData = {
    //   ...data,
    //   file,
    //   CourseTypeId: currentCourseType.value,
    //   CourseLvlId: currentCourseLevel.value,
    //   TeacherId: currentTeachers.value,
    //   ClassId: currentClassRoom.value,
    //   CoursePrerequisiteId: currentPrerequisite.value,
    //   TremId: currentTerm.value,
    //   StartTime: new Date(data.StartTime).toISOString(),
    //   EndTime: new Date(data.EndTime).toISOString(),
    // };
    // // postDataMutate(["/Course", AllData, "multipart/form-data"], {
    // //   onSuccess: (data) => {
    // //     console.log("Success:", data);
    // //   },
    // //   onError: (error) => {
    // //     console.error("Error:", error);
    // //   },
    // // });
    // console.log("AllData ==>", AllData);
    // reset();
  };

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
              <Col md="6" className="mb-1">
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
              <Col md="6" className="mb-1">
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
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان دوره
                </Label>
                <Controller
                  id="Title"
                  name="Title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="اسم کارت را وارد کنید"
                      invalid={!!errors.Title}
                      {...field}
                    />
                  )}
                />
                {errors.Title && (
                  <FormFeedback>{errors.Title.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="Describe">
                  توضیحات
                </Label>
                <Controller
                  id="Describe"
                  name="Describe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="راجب اخبار توضیحی بده"
                      invalid={!!errors.Describe}
                      {...field}
                    />
                  )}
                />
                {errors.Describe && (
                  <FormFeedback>{errors.Describe.message}</FormFeedback>
                )}
              </Col>
              <Col md="12">
                <Label for="Image">آپلود عکس</Label>
                <Controller
                  control={control}
                  name="Image"
                  render={({ field }) => (
                    <Input
                      className="mb-1"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(e.target.files);
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      invalid={!!errors.Image}
                    />
                  )}
                />
                {errors.Image && (
                  <FormFeedback>{errors.Image.message}</FormFeedback>
                )}
                {preview && (
                  <img
                    src={preview}
                    alt="پیش نمایش"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="StartTime">
                  تاریخ شروع دوره
                </Label>
                <Controller
                  id="StartTime"
                  name="StartTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="date"
                      invalid={!!errors.StartTime}
                      {...field}
                    />
                  )}
                />
                {errors.StartTime && (
                  <FormFeedback>{errors.StartTime.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="EndTime">
                  تاریخ پایان دوره
                </Label>
                <Controller
                  id="EndTime"
                  name="EndTime"
                  control={control}
                  render={({ field }) => (
                    <Input type="date" invalid={!!errors.EndTime} {...field} />
                  )}
                />
                {errors.EndTime && (
                  <FormFeedback>{errors.EndTime.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="CurrentCoursePaymentNumber">
                  تعداد اقساط دوره
                </Label>
                <Controller
                  name="CurrentCoursePaymentNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="تعداد اقساط پرداخت دوره"
                      invalid={!!errors.CurrentCoursePaymentNumber}
                      {...field}
                    />
                  )}
                />
                {errors.CurrentCoursePaymentNumber && (
                  <FormFeedback>
                    {errors.CurrentCoursePaymentNumber.message}
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <ModalFooter>
              <div className="d-flex justify-content-between">
                <Button type="submit" color="primary" className="btn-next">
                  <span className="align-middle d-sm-inline-block d-none">
                    ثبت تغییرات
                  </span>
                </Button>
              </div>
            </ModalFooter>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ChildrenModalCourse;
