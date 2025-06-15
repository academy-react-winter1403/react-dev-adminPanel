// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  ModalFooter,
  Label,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { usePutData } from "../../../@core/services/api";

const EditModalBuilding = ({
  isOpen,
  toggleFunction,
  selectedId,
  isActive,
}) => {
  // ** Yup Validation Schema
  const validationSchema = Yup.object().shape({
    buildingName: Yup.string()
      .required("نام ساختمان الزامی است")
      .min(2, "نام ساختمان باید حداقل ۲ کاراکتر باشد"),

    workDate: Yup.date()
      .required("تاریخ انجام کار الزامی است")
      .typeError("تاریخ نامعتبر است"),

    floor: Yup.number()
      .required("شماره طبقه الزامی است")
      .integer("شماره طبقه باید عدد صحیح باشد")
      .min(0, "شماره طبقه نمی‌تواند منفی باشد"),
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      buildingName: "",
      floor: "",
      workDate: "",
      id: selectedId,
      active: isActive,
    },
    resolver: yupResolver(validationSchema),
  });

  const { mutate: putDataMutate } = usePutData("putBuildingData");
  const onSubmit = (data) => {
    const dataObj = {
      buildingName: data.buildingName,
      floor: data.floor,
      workDate: data.workDate,
    };

    putDataMutate(["/Building", dataObj, "application/json"], {
      onSuccess: (data) => {
        console.log("Success:", data);
        toggleFunction();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleFunction}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleFunction}>ویرایش دسته بندی</ModalHeader>
      <ModalBody>
        {/* <Fragment> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="4" className="mb-1">
              <Label className="form-label" for="buildingName">
                نام ساختمان
              </Label>
              <Controller
                id="buildingName"
                name="buildingName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="نام ساختمان را وارد کنید"
                    invalid={!!errors.buildingName}
                    {...field}
                  />
                )}
              />
              {errors.buildingName && (
                <FormFeedback>{errors.buildingName.message}</FormFeedback>
              )}
            </Col>
            <Col md="4" className="mb-1">
              <Label className="form-label" for="workDate">
                تایم کاری
              </Label>
              <Controller
                id="workDate"
                name="workDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" invalid={!!errors.workDate} {...field} />
                )}
              />
              {errors.workDate && (
                <FormFeedback>{errors.workDate.message}</FormFeedback>
              )}
            </Col>
            <Col md="4" className="mb-1">
              <Label className="form-label" for="floor">
                طبقه
              </Label>
              <Controller
                name="floor"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    rows="3"
                    placeholder="طبقه ساختمان را وارد کنید"
                    invalid={!!errors.floor}
                    {...field}
                  />
                )}
              />
              {errors.floor && (
                <FormFeedback>{errors.floor.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <ModalFooter>
            <div className="d-flex justify-content-between">
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  ثبت تغییرات
                </span>
              </Button>
            </div>
          </ModalFooter>
        </Form>
        {/* </Fragment> */}
      </ModalBody>
    </Modal>
  );
};

export default EditModalBuilding;
