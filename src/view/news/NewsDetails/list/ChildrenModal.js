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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData, usePutData } from "../../../../@core/services/api";
import { setCategory } from "../store/NewDetailSlice";

const ChildrenModal = () => {
  const [currentCategory, setCurrentCategory] = useState({});
  const [preview, setPreview] = useState(null);
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

    CurrentImageAddress: Yup.mixed()
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
      Title: "",
      Describe: "",
      MiniDescribe: "",
      GoogleTitle: "",
      GoogleDescribe: "",
      CurrentImageAddress: null,
    },
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const Category = useSelector((state) => state.NewDetailSlice.Category);

  const { id } = useParams();
  const { data, isLoading } = getData("editNews", `/News/${id}`);

  useEffect(() => {
    if (!isLoading && data) {
      console.log("dataForEdit", data.detailsNewsDto);
      reset({
        Id: data?.detailsNewsDto.id,
        Active: data?.detailsNewsDto.active,
        Keyword: data?.detailsNewsDto.keyword,
        Title: data?.detailsNewsDto.title || "",
        Describe: data?.detailsNewsDto.describe || "",
        MiniDescribe: data?.detailsNewsDto.miniDescribe || "",
        GoogleTitle: data?.detailsNewsDto.googleTitle || "",
        GoogleDescribe: data?.detailsNewsDto.googleDescribe || "",
        IsSlider: data?.detailsNewsDto.isSlider,
        SlideNumber: 1,
      });
    }
  }, [isLoading, data]);

  const { data: dataCategory, isLoading: isLoadingCategory } = getData(
    "dataCategory",
    `/News/GetListNewsCategory`
  );
  useEffect(() => {
    if (!isLoadingCategory && dataCategory) {
      dispatch(
        setCategory(
          dataCategory.map((item) => ({
            value: item.id,
            label: item.categoryName,
          }))
        )
      );
    }
  }, [isLoadingCategory, dataCategory]);
  useEffect(() => {
    if (Category && Category.length > 0) {
      setCurrentCategory(Category[0]);
    }
  }, [Category]);
  
  const { mutate: postDataMutate } = usePutData("postAllData");
  const onSubmit = (data) => {
    const file = data.CurrentImageAddress[0];
    const AllData = {
      ...data,
      file,
      NewsCatregoryId: currentCategory.value,
    };
    postDataMutate(["/News/UpdateNews", AllData, "multipart/form-data"], {
      onSuccess: (data) => {
        console.log("Success:", data);
        toggleFunction();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
    reset();
  };

  return (
    <Fragment>
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
          <Col className="my-md-0 my-1" md="12">
            <Label for="plan-select">دسته بندی</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={Category}
              value={currentCategory}
              onChange={(data) => {
                setCurrentCategory(data);
              }}
            />
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
        <Row>
          <Col md="12">
            <Label for="CurrentImageAddress">آپلود عکس</Label>
            <Controller
              control={control}
              name="CurrentImageAddress"
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
                  invalid={!!errors.CurrentImageAddress}
                />
              )}
            />
            {errors.CurrentImageAddress && (
              <FormFeedback>{errors.CurrentImageAddress.message}</FormFeedback>
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
    </Fragment>
  );
};

export default ChildrenModal;
