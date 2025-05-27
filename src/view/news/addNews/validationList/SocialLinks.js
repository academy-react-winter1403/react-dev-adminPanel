// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { ArrowLeft } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalInfo } from "../store/allDataAddNews";

const schema = yup.object().shape({
  Keyword: yup.string().required("کیورد اجباری است"),
  IsSlider: yup.boolean().oneOf([true, false], "وضعیت اسلایدر را مشخص کنید"),
  NewsCatregoryId: yup
    .number()
    .typeError("آیدی دسته‌بندی باید عدد باشد")
    .integer("آیدی دسته‌بندی باید عدد صحیح باشد")
    .min(1, "آیدی باید حداقل 1 باشد")
    .max(100, "آیدی نمی‌تواند بیشتر از 100 باشد")
    .required("آیدی دسته‌بندی الزامی است"),
});

const defaultValues = {
  Keyword: "",
  IsSlider: false,
  NewsCatregoryId: "",
};

const SocialLinks = ({ stepper, onFinalSubmit }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const mainInfo = useSelector((state) => state.allDataAddNews.mainInfo);
  const image = useSelector((state) => state.allDataAddNews.Image);
  // const additionalInfo = useSelector((state) => state.allDataAddNews.additionalInfo);
  

  const onSubmit = (data) => {
    dispatch(setAdditionalInfo(data));
    const fullData = {
      ...image,
      ...mainInfo,
      ...data
    }
    onFinalSubmit(fullData);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">دسته بندی کارت</h5>
        <small>اطلاعات مورد نظر برای اخبار را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Label>کلمات مهم سایت</Label>
            <Controller
              name="Keyword"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="مثلاً: خبر، ورزشی، اقتصادی"
                  invalid={!!errors.Keyword}
                  {...field}
                />
              )}
            />
            {errors.Keyword && (
              <FormFeedback>{errors.Keyword.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="d-flex align-items-center mt-1">
            <Controller
              name="IsSlider"
              control={control}
              render={({ field }) => (
                <div className="form-check">
                  <Input
                    type="checkbox"
                    id="IsSlider"
                    className="form-check-input"
                    {...field}
                    checked={field.value}
                  />
                  <Label className="form-check-label ms-1" for="IsSlider">
                    نمایش در اسلایدر؟
                  </Label>
                </div>
              )}
            />
            {errors.IsSlider && (
              <FormFeedback>{errors.IsSlider.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="NewsCatregoryId">
              آیدی دسته‌بندی
            </Label>
            <Controller
              name="NewsCatregoryId"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="فقط عدد وارد شود (مثلاً: 1)"
                  id="NewsCatregoryId"
                  invalid={!!errors.NewsCatregoryId}
                  {...field}
                />
              )}
            />
            {errors.NewsCatregoryId && (
              <FormFeedback>{errors.NewsCatregoryId.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
