import { useFormik } from "formik";
import {
  Button,
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

const TermCloseDateForm = ({
  isOpen,
  toggle,
  title,
  btnTextContent,
  inputOptionData,
  formSubmitHandle,
  termFieldFlag,
  formData,
  termList,
}) => {
  const [termId, setTermId] = useState(null);
  const initialValues = {
    termName: formData ? formData.termName : "",
    termId: termId ? termId.id : "",
    departmentId: formData ? formData.departmentId : "",
    startDate: formData ? formData.startDate : "",
    closeReason: formData ? formData.closeReason : "",
    endDate: formData ? formData.endDate : "",
  };

  const validation = yup.object({
    termName: yup.string().required("این فیلد اجباریست"),
    // departmentId: yup.string().required("این فیلد اجباریست"),
    startDate: yup.string().required("این فیلد اجباریست"),
    closeReason: yup.string().required("این فیلد اجباریست"),
    endDate: yup.string().required("این فیلد اجباریست"),
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
            {termFieldFlag && (
              <Col md="12" className="mb-1">
                <Label className="form-label" for="termName">
                  نام ترم
                </Label>
                <Input
                  type="select"
                  id="termName"
                  placeholder="نام ترم"
                  name="termName"
                  onChange={formik.handleChange}
                  value={formik.values.termName}
                  invalid={!!formik.errors.termName}
                >
                  <option value="">انتخاب کنید</option>
                  {termList?.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.termName}
                        onClick={() => setTermId(item)}
                      >
                        {item.termName}
                      </option>
                    );
                  })}
                </Input>
                <FormFeedback>{formik.errors.closeReason}</FormFeedback>
              </Col>
            )}
            <Col md="12" className="mb-1">
              <Label className="form-label" for="termName">
                دلیل بسته بودن
              </Label>
              <Input
                id="closeReason"
                placeholder="دلیل بسته بودن"
                name="closeReason"
                onChange={formik.handleChange}
                value={formik.values.closeReason}
                invalid={!!formik.errors.closeReason}
              />
              <FormFeedback>{formik.errors.closeReason}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="startDate">
                زمان شروع
              </Label>
              <DatePicker
                name="startDate"
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "startDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="text-danger">{formik.errors.startDate}</div>
              ) : null}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="endDate">
                زمان پایان
              </Label>
              <DatePicker
                name="endUrl"
                calendar={persian}
                locale={persian_fa}
                containerStyle={{
                  width: "100%",
                }}
                format="YYYY/MM/DD"
                onChange={(ev) => {
                  handleDatePicker(ev, "endDate");
                }}
                style={{
                  width: "100%",
                  height: "39px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                }}
                className="datePicker"
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="text-danger">{formik.errors.endDate}</div>
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

export default TermCloseDateForm;
