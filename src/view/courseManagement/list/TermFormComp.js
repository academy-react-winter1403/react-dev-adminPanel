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

const TermFormComp = ({
  isOpen,
  toggle,
  title,
  btnTextContent,
  inputOptionData,
  formSubmitHandle,
  statusFlag,
  formData
}) => {
  const initialValues = {
    termName: formData ? formData.termName : "",
    departmentId: formData ? formData.departmentId : "",
    startDate: formData ? formData.startDate : "",
    endDate: formData ? formData.endDate : "",
    expire: "",
  };

  console.log(formData)

  const statusData = [
    { id: 1, title: "منقضی شده" },
    { id: 2, title: "منقضی نشده" },
  ];

  let validation;

  if (statusFlag) {
    validation = yup.object({
      termName: yup.string().required("این فیلد اجباریست"),
      departmentId: yup.string().required("این فیلد اجباریست"),
      startDate: yup.string().required("این فیلد اجباریست"),
      endDate: yup.string().required("این فیلد اجباریست"),
      expire: yup.string().required("این فیلد اجباریست"),
    });
  } else {
    validation = yup.object({
      termName: yup.string().required("این فیلد اجباریست"),
      departmentId: yup.string().required("این فیلد اجباریست"),
      startDate: yup.string().required("این فیلد اجباریست"),
      endDate: yup.string().required("این فیلد اجباریست"),
    });
  }

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
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
            <Col md="12" className="mb-1">
              <Label className="form-label" for="termName">
                نام ترم
              </Label>
              <Input
                id="termName"
                placeholder="نام ترم"
                name="termName"
                onChange={formik.handleChange}
                value={formik.values.termName}
                invalid={!!formik.errors.termName}
              />
              <FormFeedback>{formik.errors.termName}</FormFeedback>
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="departmentId">
                بخش
              </Label>
              <Input
                type="select"
                name="departmentId"
                id="departmentId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.departmentId}
                invalid={
                  formik.touched.departmentId && !!formik.errors.departmentId
                }
              >
                <option value="">انتخاب کنید</option>
                {inputOptionData &&
                  inputOptionData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.depName}
                    </option>
                  ))}
              </Input>
              {formik.touched.departmentId && formik.errors.departmentId ? (
                <div className="text-danger">{formik.errors.departmentId}</div>
              ) : null}
            </Col>

            {statusFlag && (
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="departmentId">
                  وضعیت
                </Label>
                <Input
                  type="select"
                  name="expire"
                  id="expire"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expire}
                  invalid={formik.touched.expire && !!formik.errors.expire}
                >
                  <option value="">انتخاب کنید</option>
                  {statusData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Input>
                {formik.touched.expire && formik.errors.expire ? (
                  <div className="text-danger">{formik.errors.expire}</div>
                ) : null}
              </Col>
            )}

            <Col md="6" className="mb-1">
              <Label className="form-label" for="startDate">
                زمان شروع
              </Label>
              <DatePicker
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
                name="startDate"
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
                name="endDate"
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

export default TermFormComp;
