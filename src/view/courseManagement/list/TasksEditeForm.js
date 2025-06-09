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
import { ChangeMoment } from "../../../@core/hooks";

const TasksEditeForm = ({
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
  const [termId, setTermId] = useState(null);
  const [workDate, setWorkDate] = useState(null);
  const [asliDate, setAsliDate] = useState(null)
  console.log(formData);

  if (formData) {
    var { workSingelData, assistanceWorkDataSingelData } = formData;
    console.log("workSingelData ==>", workSingelData)
  }

  if (assistanceWorkDataSingelData) {
    var { courseAssistanceDto } = assistanceWorkDataSingelData;
  }

  console.log(workSingelData);

  const changeMoment = () => {
    const newDate = ChangeMoment(
      workSingelData?.workDate,
      "YYYY/MM/DD",
      "persian"
    );
    setWorkDate(newDate);
    console.log("workDate ==>", workDate);
  };

  useEffect(() => {
    if (formData) {
      changeMoment();
    }
  }, [formData]);

  if (workDate) {
    console.log(workDate);
  }

  const initialValues = {
    worktitle: formData ? workSingelData?.worktitle : "",
    workDescribe: formData ? workSingelData?.workDescribe : "",
    assistanceId: formData ? workSingelData?.id : "",
    assistanceName: formData
      ? courseAssistanceDto
        ? courseAssistanceDto.assistanceName
        : workSingelData?.assistanceName
      : "",
    workDate: asliDate ? asliDate : "",
    id: formData ? workSingelData?.workId: "",
  };

  const validation = yup.object({
    worktitle: yup.string().required("این فیلد اجباریست"),
    workDescribe: yup.string().required("این فیلد اجباریست"),
    assistanceName: yup.string().required("این فیلد اجباریست"),
    workDate: yup.string().required("این فیلد اجباریست"),
  });

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
        // console.log(values)
      formSubmitHandle(values);
    },
  });

  const handleDatePicker = (date, section) => {
    const gregorianDate = new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DDTHH:mm:ss");
    //   setWorkDate(gregorianDate)
    setAsliDate(gregorianDate)
    formik.setFieldValue(section, gregorianDate);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-base"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
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
              <Label className="form-label" for="assistanceName">
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
                value={workDate}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "workDate");
                  setWorkDate(ev);
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
      </ModalBody>
    </Modal>
  );
};

export default TasksEditeForm;
