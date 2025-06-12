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
} from "reactstrap";
import * as yup from "yup";

const CreateGroupFormModal = ({
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

  console.log("formData ==>", formData)

  const initialValues = {
    groupName: formData ? formData[titleField] : "",
    groupCapacity: formData ? formData[capacityField] : "",
  };

  console.log("formData ==>", formData);

  let validation;

  if (inputType === "text") {
    validation = yup.object({
      groupName: yup.string().required("نام گروه الزامی است"),
      groupCapacity: yup.string().test("groupCapacity", "آدرس گروه الزامی است", (value) => {
        const regex = /https?:\/\/[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*(:[0-9]{1,5})?(\/[^\s]*)?$/;
        if (regex.test(value)) return true;
        return false;
      }).required("ظرفیت گروه الزامی است"),
    });
  }

  if (inputType === "number") {
    validation = yup.object({
      groupName: yup.string().required("نام گروه الزامی است"),
      groupCapacity: yup.number().required("ظرفیت گروه الزامی است"),
    });
  }

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
        <h4>{title}</h4>
      </ModalHeader>
      <ModalBody
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Col>
          <Input
            type="text"
            placeholder={inputNamePlaceholder}
            name="groupName"
            onChange={formik.handleChange}
            value={formik.values.groupName}
            className={formik.errors.groupName ? "is-invalid" : ""}
          />
          {formik.errors.groupName && (
            <Label className="text-danger">{formik.errors.groupName}</Label>
          )}
        </Col>
        <Col>
          <Input
            type={inputType === "number" ? "number" : "text"}
            placeholder={inputCapacityPlaceholder}
            name="groupCapacity"
            onChange={formik.handleChange}
            value={formik.values.groupCapacity}
            className={formik.errors.groupCapacity ? "is-invalid" : ""}
          />
          {formik.errors.groupCapacity && (
            <Label className="text-danger">{formik.errors.groupCapacity}</Label>
          )}
        </Col>
      </ModalBody>
      <Button color="primary" type="submit" onClick={formik.handleSubmit}>
        ثبت
      </Button>
    </Modal>
  );
};

export default CreateGroupFormModal;
