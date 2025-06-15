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
import {
  getData,
  usePostData,
  usePutData,
} from "../../../../@core/services/api";

const EditFormModal = ({ isOpen, toggleFunction, selectedId }) => {
  // ** Yup Validation Schema
  const validationSchema = Yup.object().shape({
    CategoryName: Yup.string()
      .required("عنوان الزامی است")
      .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
      .max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد"),

    GoogleTitle: Yup.string()
      .notRequired()
      .min(40, "عنوان گوگل باید حداقل 40 کاراکتر باشد")
      .max(70, "عنوان گوگل نباید بیش از 70 کاراکتر باشد"),

    GoogleDescribe: Yup.string()
      .required("توضیح گوگل الزامی است")
      .min(50, "توضیح گوگل باید حداقل ۵۰ کاراکتر باشد")
      .max(160, "توضیح گوگل نباید بیش از ۱۶۰ کاراکتر باشد"),
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      CategoryName: "",
      GoogleTitle: "",
      GoogleDescribe: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { mutate: putDataMutate } = usePutData("putCategoryData");
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Id", selectedId);
    formData.append("CategoryName", data.CategoryName);
    formData.append("GoogleTitle", data.GoogleTitle);
    formData.append("GoogleDescribe", data.GoogleDescribe);

    putDataMutate(
      ["/News/UpdateNewsCategory", formData, "multipart/form-data"],
      {
        onSuccess: (data) => {
          console.log("Success:", data);
          toggleFunction();
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      }
    );
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
            <Col md="6" className="mb-1">
              <Label className="form-label" for="CategoryName">
                عنوان اخبار
              </Label>
              <Controller
                id="CategoryName"
                name="CategoryName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="اسم کارت را وارد کنید"
                    invalid={!!errors.CategoryName}
                    {...field}
                  />
                )}
              />
              {errors.CategoryName && (
                <FormFeedback>{errors.CategoryName.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                کلمات مهم عنوان برای بازدید بیشتر
              </Label>
              <Controller
                name="GoogleTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="عنوانی که در گوگل نمایش داده می‌شود"
                    invalid={!!errors.GoogleTitle}
                    {...field}
                  />
                )}
              />
              {errors.GoogleTitle && (
                <FormFeedback>{errors.GoogleTitle.message}</FormFeedback>
              )}
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                کلمات مهم توضیحات برای بازدید بیشتر
              </Label>
              <Controller
                name="GoogleDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    rows="3"
                    placeholder="توضیحاتی که در گوگل نمایش داده می‌شود"
                    invalid={!!errors.GoogleDescribe}
                    {...field}
                  />
                )}
              />
              {errors.GoogleDescribe && (
                <FormFeedback>{errors.GoogleDescribe.message}</FormFeedback>
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

export default EditFormModal;
