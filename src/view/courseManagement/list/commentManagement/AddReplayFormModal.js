import { useFormik } from "formik";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as yup from "yup";

const AddReplayFormModal = ({
  isOpen,
  toggle,
  title,
  inputNamePlaceholder,
  inputCapacityPlaceholder,
  submitHandle,
  formData,
  titleField,
  capacityField,
  inputType,
}) => {
  console.log("formData ==>", formData);

  const validation = yup.object({
    Title: yup.string().required("عنوان انتخاب نشده است"),
    Describe: yup.string().required("توضیحات انتخاب نشده است"),
  });

  const initialValues = {
    Title: "",
    Describe: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      submitHandle(values);
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ marginTop: "100px" }}>
      <ModalHeader toggle={toggle}>
        <h4>{`پاسخ به کامنت ${formData?.title}`}</h4>
      </ModalHeader>
      <ModalBody
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Col>
          <Label>عنوان کامنت</Label>
          <Input
            type="text"
            placeholder={inputNamePlaceholder}
            name="Title"
            onChange={formik.handleChange}
            value={formik.values.Title}
            className={formik.errors.Title ? "is-invalid" : ""}
          />
          {formik.errors.Title && (
            <Label className="text-danger">{formik.errors.Title}</Label>
          )}
        </Col>
        <Col>
          <Label>توضیحات کامنت</Label>
          <Input
            type={inputType === "number" ? "number" : "text"}
            placeholder={inputCapacityPlaceholder}
            name="Describe"
            onChange={formik.handleChange}
            value={formik.values.Describe}
            className={formik.errors.Describe ? "is-invalid" : ""}
          />
          {formik.errors.Describe && (
            <Label className="text-danger">{formik.errors.Describe}</Label>
          )}
        </Col>
        <Row className="d-flex justify-content-start">
          <Col md={2}>
            <Button color="primary" type="submit" onClick={formik.handleSubmit}>
              ثبت
            </Button>
          </Col>
          <Col md={2}>
            <Button color="danger" type="submit" onClick={toggle}>
              لغو
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default AddReplayFormModal;
