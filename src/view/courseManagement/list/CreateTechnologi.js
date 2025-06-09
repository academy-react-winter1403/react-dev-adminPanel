// import { Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
// import ModalForm from "../../../@core/components/common/modals/ModalForm"

// export const CreateTechnologi = ({ toggle, isOpen }) => {
//     return (
//         <Modal isOpen={isOpen} toggle={toggle}>
//             <ModalHeader>
//                 <label> افزودن تکنولوژی جدید </label>
//             </ModalHeader>
//             <ModalBody style={{display: "flex"}}>
//                 <Col className="w-50">
//                     <Row>
//                         <div>
//                             <img />
//                         </div>
//                         <Input type="file"/>
//                     </Row>
//                     <Row></Row>
//                 </Col>
//                 <Col className="w-50 p-0" >
//                     <Row className="m-0 p-0 w-100">
//                         <label className="m-0" style={{textIndent: "-12px"}}> عنوان تکنولوژی </label>
//                         <Input />
//                     </Row>
//                     <Row className="m-0 p-0 w-100">
//                         <label style={{textIndent: "-12px"}}> توضیحات تکنولوژی </label>
//                         <Input />
//                     </Row>
//                 </Col>
//             </ModalBody>
//         </Modal>
//         // <ModalForm />
//     )
// }

import { useFormik } from "formik";

import {
  Card,
  CardBody,
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

import { useEffect, useState } from "react";
import { Camera } from "react-feather";
// import TechnologiesValidation from "../../../../@core/validations/Technologies.Validation";
import * as Yup from "yup"

export const CreateTechnologi = ({
  showModal,
  setShowModal,
  refetch,
  variantState,
  categoryDetails,
  formSubmit
}) => {
  const [src, setSrc] = useState();
  // console.log(categoryDetails);

  const titleVariant = {
    create: "افزودن تکنولوژی جدید",
    update: "ویرایش تکنولوژی",
  };

  const initialValues = {
    iconAddress: categoryDetails ? categoryDetails.iconAddress : "",
    techName: categoryDetails ? categoryDetails.techName : "",
    describe: categoryDetails ? categoryDetails.describe : "",
  };

  const TechnologiesValidation = Yup.object({
    techName: Yup.string().required("فیلد الزامی!"),
    describe: Yup.string().required("فیلد الزامی!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: TechnologiesValidation,
    onSubmit: (values) => {
      formSubmit(values)
    },
  });

  const handleChooseImage = (event) => {
    let file = URL.createObjectURL(event.target.files[0]);
    setSrc(file);
    formik.setFieldValue("Image", file);
  };
  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          {titleVariant?.[variantState]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col
                md="6"
                className="mb-1"
                style={{ height: "250px", position: "relative" }}
              >
                <img className="w-100 h-100 rounded-4" src={src} alt="" />
                <Label
                  for="iconAddress"
                  style={{
                    border: "1px solid #ccc",
                    overflow: "hidden",
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: "10px",
                    translate: "-50% -50%",
                    cursor: "pointer",
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Camera />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    id="iconAddress"
                    className="h-100"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleChooseImage(event);
                    }}
                  />
                </Label>
              </Col>
              <Col md="6" sm="12">
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="techName">
                    عنوان تکنولوژی
                  </Label>
                  <Input
                    type="text"
                    name="techName"
                    id="techName"
                    placeholder="نام تکنولوژی"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.techName}
                    invalid={
                      formik.touched.techName && !!formik.errors.techName
                    }
                  />
                  {formik.touched.techName && formik.errors.techName ? (
                    <div className="text-danger">{formik.errors.techName}</div>
                  ) : null}
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="describe">
                    توضیحات تکنولوژی
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
