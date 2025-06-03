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
import ClassroomValidations from "../../../@core/validations/ClassroomValidations";
import { useEffect, useState } from "react";

const CreateDepartment = ({
  refetch,
  isOpen,
  toggle,
  clasesRoomData,
  departmentInfo,
  formOnClick,
  createBtnContentText,
}) => {
  let initialValues = {
    classRoomName: departmentInfo ? departmentInfo.depName : "",
    capacity:  0,
    buildingId:  "",
  };

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    validationSchema: ClassroomValidations,
    enableReinitialize: true,
    onSubmit: (values) => {
      formOnClick(values);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-base"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">اضافه کردن کلاس</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="classRoomName">
                نام کلاس
              </Label>
              <Input
                id="classRoomName"
                placeholder="نام کلاس"
                name="classRoomName"
                onChange={formik.handleChange}
                value={formik.values.classRoomName}
                invalid={!!formik.errors.classRoomName}
              />
              <FormFeedback>{formik.errors.classRoomName}</FormFeedback>
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="buildingId">
                ساختمان
              </Label>
              <Input
                type="select"
                name="buildingId"
                id="buildingId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.buildingId}
                invalid={
                  formik.touched.buildingId && !!formik.errors.buildingId
                }
              >
                <option value="">انتخاب کنید</option>
                {clasesRoomData &&
                  clasesRoomData.map((category) => {
                    // console.log(category);
                    return (
                      <option key={category.id} value={category.id}>
                        {category.buildingName}
                      </option>
                    );
                  })}
              </Input>
              {formik.touched.buildingId && formik.errors.buildingId ? (
                <div className="text-danger">{formik.errors.buildingId}</div>
              ) : null}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                {createBtnContentText}
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

export default CreateDepartment;
