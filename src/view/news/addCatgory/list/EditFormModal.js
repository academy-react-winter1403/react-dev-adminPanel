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
import { usePostData } from "../../../../@core/services/api";

const EditFormModal = ({ isOpen, toggleFunction, selectedId }) => {
  const [currentCategory, setCurrentCategory] = useState({});
  const [preview, setPreview] = useState(null);
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

    Image: Yup.mixed()
      .required("عکس الزامیست")
      .test("fileType", "فرمت فقط jpg یا png باشد", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
      })
      .test("fileSize", "حجم فایل باید کمتر از ۲ مگابایت باشد", (value) => {
        return value && value[0]?.size <= 2 * 1024 * 1024;
      }),
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
      Image: null,
    },
    resolver: yupResolver(validationSchema),
  });

  // const { mutate: postDataMutate } = usePostData("postAllData");
  const onSubmit = (data) => {
    // const formData = new FormData();
    // formData.append("CategoryName", data.CategoryName);
    // formData.append("GoogleTitle", data.GoogleTitle);
    // formData.append("GoogleDescribe", data.GoogleDescribe);
    // formData.append("Image", data.Image[0]);
    console.log(formData);
    // postDataMutate(
    //   ["/News/CreateNewsCategory", formData, "multipart/form-data"],
    //   {
    //     onSuccess: (data) => {
    //       console.log("Success:", data);
    //     },
    //     onError: (error) => {
    //       console.error("Error:", error);
    //     },
    //   }
    // );

    // const { data:getCategoryWithId, isLoading:IsLoadingCategoryWithId } = getData("editNews", `/News/${selectedId}`);
    useEffect(() => {
      // if (selectedId) {
        console.log(selectedId)
        // if (!IsLoadingCategoryWithId && getCategoryWithId) {
        //   console.log(getCategoryWithId)
        // }
      // }
    }, [selectedId]);
  };
  // console.log("test id",selectedId)
  
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleFunction}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleFunction}>Modal title</ModalHeader>
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
            <Col md="12">
              <Label for="Image">آپلود عکس</Label>
              <Controller
                control={control}
                name="Image"
                render={({ field }) => (
                  <Input
                    className="mb-1"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(e.target.files);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    invalid={!!errors.Image}
                  />
                )}
              />
              {errors.Image && (
                <FormFeedback>{errors.Image.message}</FormFeedback>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="پیش نمایش"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
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
