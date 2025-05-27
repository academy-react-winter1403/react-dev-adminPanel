// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMainInfo } from "../store/allDataAddNews";

// ** Yup Validation Schema
const validationSchema = Yup.object().shape({
  Title: Yup.string()
    .required("عنوان الزامی است")
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد"),

  Describe: Yup.string()
    .required("توضیحات الزامی است")
    .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),

  MiniDescribe: Yup.string()
    .required("توضیح کوتاه الزامی است")
    .max(150, "توضیح کوتاه نباید بیشتر از ۱۵۰ کاراکتر باشد"),

  GoogleTitle: Yup.string()
    .notRequired()
    .min(5, "عنوان گوگل باید حداقل ۵ کاراکتر باشد")
    .max(60, "عنوان گوگل نباید بیش از ۶۰ کاراکتر باشد"),

  GoogleDescribe: Yup.string()
    .required("توضیح گوگل الزامی است")
    .min(50, "توضیح گوگل باید حداقل ۵۰ کاراکتر باشد")
    .max(160, "توضیح گوگل نباید بیش از ۱۶۰ کاراکتر باشد"),
});

// ** Default Values
const defaultValues = {
  Title: "",
  Describe: "",
  MiniDescribe: "",
  GoogleTitle: "",
  GoogleDescribe: "",
};

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const mainInfo = useSelector((state) => state.allDataAddNews.mainInfo);
  const image = useSelector((state) => state.allDataAddNews.Image);

  const onSubmit = (data) => {
    dispatch(setMainInfo(data))
    console.log("fileImage",image)
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات سئو</h5>
        <small>اطلاعات مورد نظر برای اخبار را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="Title">
              عنوان اخبار
            </Label>
            <Controller
              id="Title"
              name="Title"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="اسم کارت را وارد کنید"
                  invalid={!!errors.Title}
                  {...field}
                />
              )}
            />
            {errors.Title && (
              <FormFeedback>{errors.Title.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="Describe">
              توضیحات
            </Label>
            <Controller
              id="Describe"
              name="Describe"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="راجب اخبار توضیحی بده"
                  invalid={!!errors.Describe}
                  {...field}
                />
              )}
            />
            {errors.Describe && (
              <FormFeedback>{errors.Describe.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="MiniDescribe">
              خلاصه ای از توضیحات
            </Label>
            <Controller
              name="MiniDescribe"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="خلاصه‌ای کوتاه"
                  invalid={!!errors.MiniDescribe}
                  {...field}
                />
              )}
            />
            {errors.MiniDescribe && (
              <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>
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
        </Row>
        <Row>
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
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              مرحله قبلی
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">مرحله بعدی</span>
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

export default PersonalInfo;
