import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import * as yup from "yup";
import { useEffect, useState } from "react";

const CreateMentorForm = ({
  isOpen,
  toggle,
  title,
  btnTextContent,
  inputOptionData,
  formSubmitHandle,
  termFieldFlag,
  formData,
  termList,
  cahngeModalFlag,
  mentorNameInputClick,
  courseNameInputClick,
}) => {
  if (formData) {
    var { mentorData, courseData } = formData;
  }

  const initialValues = {
    mentorName: mentorData ? mentorData.assistanceName : "",
    courseName: courseData ? courseData.title : "",
    courseId: mentorData ? mentorData.courseId : "",
    userId: mentorData ? mentorData.userId : "",
  };

  const validation = yup.object({
    mentorName: yup.string().required("این فیلد اجباریست"),
    courseName: yup.string().required("این فیلد اجباریست"),
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      formSubmitHandle(values);
    },
  });

  const handleDatePicker = (date, section) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    formik.setFieldValue(section, gregorianDate);
  };

  const handleReset = () => {
    formik.resetForm();
  };

  useEffect(() => {
    handleReset()
  }, [])

  return (
    <Col md="4">
      <Card
        isOpen={true}
        toggle={toggle}
        className="modal-dialog-centered modal-base"
      >
        <CardHeader className="bg-transparent" toggle={toggle}>
          <h1>اطلاعات منتور</h1>
        </CardHeader>
        <CardBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{title}</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md="12" className="mb-1">
                <Label className="form-label" for="termName">
                  نام منتور
                </Label>
                <Input
                  type="text"
                  id="mentorName"
                  placeholder="نام منتور"
                  name="mentorName"
                  onChange={formik.handleChange}
                  value={formik.values.mentorName}
                  invalid={!!formik.errors.mentorName}
                  onClick={mentorNameInputClick}
                />
                <FormFeedback>{formik.errors.mentorName}</FormFeedback>
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="workDescribe">
                  نام دوره
                </Label>
                <Input
                  id="courseName"
                  placeholder="نام دوره را انتخاب کنید"
                  name="courseName"
                  onChange={formik.handleChange}
                  value={formik.values.courseName}
                  invalid={!!formik.errors.courseName}
                  onClick={courseNameInputClick}
                />
                <FormFeedback>{formik.errors.courseName}</FormFeedback>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ثبت
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={handleReset}
                >
                  پاک کردن فرم
                </Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CreateMentorForm;
