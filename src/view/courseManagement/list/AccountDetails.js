// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setImageCourse } from "../store/allDataAddCourse";

const AccountDetails = ({ stepper }) => {
  const [preview, setPreview] = useState(null);
  const schema = yup.object().shape({
    Image: yup
      .mixed()
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
  } = useForm({
    defaultValues: { Image: null },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  // const image = useSelector((state) => state.allDataAddCourse.Image);

  const onSubmit = (data) => {
    const form = new FormData();
    stepper.next();
    const file = data.Image[0];
    form.append("Image",file)
    dispatch(setImageCourse(form));
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">عکس کارت</h5>
        <small>اطلاعات مورد نظر برای اخبار را وارد کنید</small>
      </div>
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label for="Image">آپلود عکس</Label>
        <Controller
          control={control}
          name="Image"
          render={({ field }) => (
            <Input
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
        {errors.Image && <FormFeedback>{errors.Image.message}</FormFeedback>}
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
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              مرحله قبلی
            </span>
          </Button>
          <Button color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعدی
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
