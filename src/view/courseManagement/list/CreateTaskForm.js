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
import { useState } from "react";

const CreateTaskForm = ({
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
}) => {
  // console.log("formData ==>", formData)
  if (formData) {
    var { assistanceWorkDtos, courseAssistanceDto } = formData;
  }
  const [termId, setTermId] = useState(null);
  const initialValues = {
    worktitle: "",
    workDescribe: "",
    assistanceId: formData ? courseAssistanceDto.id : "",
    assistanceName: formData ? courseAssistanceDto.courseName : "",
    workDate: "",
  };

  const validation = yup.object({
    worktitle: yup.string().required("این فیلد اجباریست"),
    workDescribe: yup.string().required("این فیلد اجباریست"),
    assistanceId: yup.string().required("این فیلد اجباریست"),
    workDate: yup.string().required("این فیلد اجباریست"),
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

  return (
    <Card
      isOpen={true}
      toggle={toggle}
      className="modal-dialog-centered modal-base"
    >
      <CardHeader className="bg-transparent" toggle={toggle}></CardHeader>
      <CardBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">{title}</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="termName">
                نام تسک
              </Label>
              <Input
                type="text"
                id="worktitle"
                placeholder="نام ترم"
                name="worktitle"
                onChange={formik.handleChange}
                value={formik.values.worktitle}
                invalid={!!formik.errors.worktitle}
              />
              <FormFeedback>{formik.errors.worktitle}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="workDescribe">
                توضیحات تسک
              </Label>
              <Input
                id="workDescribe"
                placeholder="دلیل بسته بودن"
                name="workDescribe"
                onChange={formik.handleChange}
                value={formik.values.workDescribe}
                invalid={!!formik.errors.workDescribe}
              />
              <FormFeedback>{formik.errors.workDescribe}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="assistanceId">
                منتور
              </Label>
              <Input
                id="assistanceName"
                placeholder="دلیل بسته بودن"
                name="assistanceName"
                onChange={() => {
                  formik.handleChange, cahngeModalFlag();
                }}
                value={formik.values.assistanceName}
                invalid={!!formik.errors.assistanceName}
              />
              <FormFeedback>{formik.errors.assistanceName}</FormFeedback>
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="startDate">
                تایم تسک
              </Label>
              <DatePicker
                name="workDate"
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "workDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
              />
              {formik.touched.workDate && formik.errors.workDate ? (
                <div className="text-danger">{formik.errors.workDate}</div>
              ) : null}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                {btnTextContent}
              </Button>
              <Button type="reset" color="secondary" outline onClick={toggle}>
                لغو
              </Button>
            </Col>
          </Row>
        </form>
      </CardBody>
    </Card>
  );
};

export default CreateTaskForm;
