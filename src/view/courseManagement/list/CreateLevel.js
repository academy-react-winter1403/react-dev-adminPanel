import { useFormik } from "formik";

import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

// import { useMutation } from "@tanstack/react-query";
// import { CreateCourseLevel, CreateCourseStatus } from "../../../../@core/services/api/post-api";
// import {
//   UpdateCourseLevel,
// } from "../../../../@core/services/api/put-api";
// import CourseLevelsValidation from "../../../../@core/validations/CourseLevels.Validation";
import * as Yup from "yup"
const CreateLevel = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
  formSubmit,
}) => {
  const titleVariant = {
    create: "افزودن سطح جدید",
    update: "ویرایش سطح",
  };

  // initialValues
  const initialValues = {
    levelName: categoryDetails ? categoryDetails.levelName : "",
  };

  const CourseLevelsValidation = Yup.object({
    levelName: Yup.string().required("فیلد الزامی!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: CourseLevelsValidation,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-md"
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          {titleVariant?.[variantState]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="levelName">
                  سطح دوره
                </Label>
                <Input
                  type="text"
                  name="levelName"
                  id="levelName"
                  placeholder="سطح دوره"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.levelName}
                  invalid={
                    formik.touched.levelName && !!formik.errors.levelName
                  }
                />
                {formik.touched.levelName && formik.errors.levelName ? (
                  <div className="text-danger">{formik.errors.levelName}</div>
                ) : null}
              </Col>
              <Col sm="12">
                <div className="d-flex mt-1">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    ثبت
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    onClick={formik.handleReset}
                  >
                    پاک کردن فیلد
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateLevel;
