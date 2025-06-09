// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCourseInfoStepThree } from "../store/allDataAddCourse";
// import { setMainInfo } from "../store/allDataAddNews";

// ** Yup Validation Schema
const validationSchema = Yup.object().shape({
  StartTime: Yup.date()
    .typeError("تاریخ شروع معتبر نیست")
    .required("تاریخ شروع الزامی است"),

  EndTime: Yup.date()
    .typeError("تاریخ پایان معتبر نیست")
    .required("تاریخ پایان الزامی است"),

  // CoursePrerequisiteId: Yup.string().required("شناسه پیش‌ نیاز الزامی است"),

  CurrentCoursePaymentNumber: Yup.number()
    .typeError("تعداد اقساط باید عدد باشد")
    .notRequired(),

  UniqueUrlString: Yup.string()
    .matches(/^[a-zA-Z0-9-]+$/, "فقط حروف انگلیسی، عدد و خط تیره مجاز است.")
    .required("وارد کردن آدرس یکتا الزامی است.")
    .min(5, "حداقل ۵ کاراکتر"),
});

// ** Default Values
const defaultValues = {
  StartTime: "",
  EndTime: "",
  CurrentCoursePaymentNumber: "",
  UniqueUrlString: "",
  // CoursePrerequisiteId: "",
};

const ThirdStageCourse = ({ stepper, onFinalSubmit }) => {
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
  const ImageCourse = useSelector(
    (state) => state.allDataAddCourse.ImageCourse
  );
  const CourseInfoStepOne = useSelector(
    (state) => state.allDataAddCourse.CourseInfoStepOne
  );
  const CourseInfoStepTwo = useSelector(
    (state) => state.allDataAddCourse.CourseInfoStepTwo
  );

  const onSubmit = (data) => {
    const payload = {
      ...data,
      StartTime: new Date(data.StartTime).toISOString(),
      EndTime: new Date(data.EndTime).toISOString(),
    };
    const fullData = {
      ...ImageCourse,
      ...CourseInfoStepOne,
      ...CourseInfoStepTwo,
      ...payload,
    };
    dispatch(setCourseInfoStepThree(payload));
    onFinalSubmit(fullData);
    // console.log(fullData);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات کارت دوره</h5>
        <small>اطلاعات مورد نظر برای دوره را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="StartTime">
              تاریخ شروع دوره
            </Label>
            <Controller
              id="StartTime"
              name="StartTime"
              control={control}
              render={({ field }) => (
                <Input type="date" invalid={!!errors.StartTime} {...field} />
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
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="UniqueUrlString">
              شناسه دوره
            </Label>
            <Controller
              name="UniqueUrlString"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="شناسه دوره"
                  invalid={!!errors.UniqueUrlString}
                  {...field}
                />
              )}
            />
            {errors.UniqueUrlString && (
              <FormFeedback>{errors.UniqueUrlString.message}</FormFeedback>
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
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ThirdStageCourse;
