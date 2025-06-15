// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  ModalFooter,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useSelector } from "react-redux";
import { usePostData } from "../../../@core/services/api";
import MapPicker from "./LocationMarker";

const ChildrenModalBuilding = ({ id }) => {
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

    latitude: Yup.string()
      .required("عرض جغرافیایی الزامی است")
      .matches(
        /^-?\d{1,3}\.\d+$/,
        "عرض جغرافیایی باید مقدار عددی اعشاری معتبر باشد"
      ),

    longitude: Yup.string()
      .required("طول جغرافیایی الزامی است")
      .matches(
        /^-?\d{1,3}\.\d+$/,
        "طول جغرافیایی باید مقدار عددی اعشاری معتبر باشد"
      ),
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workDate: "",
      buildingName: "",
      floor: "",
    },
    resolver: yupResolver(validationSchema),
  });

//   const { latitude, longitude } = useSelector((state) => state.location);


  const { mutate: postDataMutate } = usePostData("postBuildingListData");
  const onSubmit = (data) => {
    const DataObj = {
      ...data,
      id: id,
      workDate: new Date(data.workDate).toISOString(),
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };
    console.log(DataObj);
    postDataMutate(["/Building", DataObj, "application/json"], {
      onSuccess: (data) => {
        console.log("Success:", data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <Fragment>
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
          {/* <Col md="12" className="mb-2">
            <Label className="form-label">انتخاب موقعیت روی نقشه</Label>
            <MapPicker />
          </Col> */}
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
    </Fragment>
  );
};

export default ChildrenModalBuilding;
