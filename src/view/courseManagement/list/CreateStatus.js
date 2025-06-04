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
import { useState } from "react";
import { Camera } from "react-feather";
import * as Yup from "yup"
// import {
//   CreateCourseLevel,
//   CreateCourseStatus,
// } from "../../../../@core/services/api/post-api";
// import { UpdateCourseStatus } from "../../../../@core/services/api/put-api";
// import CourseStatusValidation from "../../../../@core/validations/CourseStatus.Validation";
const CreateStatus = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
  formSubmit
}) => {
  // console.log(variantState)
  const [src, setSrc] = useState();
  // console.log(categoryDetails);

  const titleVariant = {
    create: "افزودن وضعیت جدید",
    update: "ویرایش وضعیت",
  };


  const CourseStatusValidation = Yup.object({
    statusName: Yup.string().required("فیلد الزامی!"),
    describe: Yup.string().required("فیلد الزامی!"),
    statusNumber: Yup.number()
      .typeError("لطفا عدید وارد کنید!")
      .required("فیلد الزامی!"),
  });

  // initialValues
  const initialValues = {
    statusName: categoryDetails ? categoryDetails.statusName : "",
    describe: categoryDetails ? categoryDetails.describe : "",
    statusNumber: categoryDetails ? categoryDetails.statusNumber : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CourseStatusValidation,
    onSubmit: (valuew) => {
      formSubmit(valuew)
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
              <Col sm="12">
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="statusName">
                    نوع وضعیت
                  </Label>
                  <Input
                    type="text"
                    name="statusName"
                    id="statusName"
                    placeholder="نوع وضعیت"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.statusName}
                    invalid={
                      formik.touched.statusName && !!formik.errors.statusName
                    }
                  />
                  {formik.touched.statusName && formik.errors.statusName ? (
                    <div className="text-danger">
                      {formik.errors.statusName}
                    </div>
                  ) : null}
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="describe">
                    توضیحات وضعیت
                  </Label>
                  <Input
                    type="string"
                    name="describe"
                    id="describe"
                    placeholder="توضیحات"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.describe}
                    invalid={
                      formik.touched.describe && !!formik.errors.describe
                    }
                  />
                  {formik.touched.describe && formik.errors.describe ? (
                    <div className="text-danger">{formik.errors.describe}</div>
                  ) : null}
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="statusNumber">
                    شماره یکتا وضعیت
                  </Label>
                  <Input
                    type="number"
                    name="statusNumber"
                    id="statusNumber"
                    placeholder="شماره یکتا"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.statusNumber}
                    invalid={
                      formik.touched.statusNumber &&
                      !!formik.errors.statusNumber
                    }
                  />
                  {formik.touched.statusNumber && formik.errors.statusNumber ? (
                    <div className="text-danger">
                      {formik.errors.statusNumber}
                    </div>
                  ) : null}
                </Col>
              </Col>
              <Col sm="12">
                <div className="d-flex mt-1">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                    // disabled={formik.isSubmitting}
                  >
                    ثبت
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    onClick={formik.handleReset}
                  >
                    پاک کردن همه
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

export default CreateStatus;
