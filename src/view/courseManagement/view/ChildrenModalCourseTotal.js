// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import makeAnimated from "react-select/animated";

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
  Card,
  CardBody,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData, usePostData, usePutData } from "../../../@core/services/api";
import {
  setCourseStatus,
  setCourseTechnology,
} from "../store/createCourseFilterSlice";
import { usePostDataTechnology } from "../../../@core/services/api/post-api/usePostDataTechnology";

const ChildrenModalCourseTotal = () => {
  const [CurrentCourseTechnology, setCurrentCourseTechnology] = useState([]);
  //   const [CurrentCourseTechnology, setCurrentCourseTechnology] = useState(second)
  const [preview, setPreview] = useState(null);
  // ** Yup Validation Schema
  //   const validationSchema = Yup.object().shape({
  //         Title: Yup.string()
  //         .required("عنوان الزامی است")
  //         .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
  //         .max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد"),

  //         Describe: Yup.string()
  //         .required("توضیحات الزامی است")
  //         .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  //         Image: Yup.mixed()
  //         .required("عکس الزامیست")
  //         .test("fileType", "فرمت فقط jpg یا png باشد", (value) => {
  //             return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
  //         })
  //         .test("fileSize", "حجم فایل باید کمتر از ۲ مگابایت باشد", (value) => {
  //             return value && value[0]?.size <= 2 * 1024 * 1024;
  //         }),
  //         CurrentCoursePaymentNumber: Yup.number()
  //         .typeError("تعداد اقساط باید عدد باشد")
  //         .notRequired(),
  //         Capacity: Yup.string().required("ظریفت دوره الزامی است"),
  //         SessionNumber: Yup.string().required("تعداد جلسات الزامی است"),
  //         Cost: Yup.string().required("قیمت دوره الزامی است"),
  //         StartTime: Yup.date()
  //         .typeError("تاریخ شروع معتبر نیست")
  //         .required("تاریخ شروع الزامی است"),

  //         EndTime: Yup.date()
  //         .typeError("تاریخ پایان معتبر نیست")
  //         .required("تاریخ پایان الزامی است"),
  //   });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // defaultValues: {
    //   //   Title: "",
    //   //   Describe: "",
    //   //   Capacity: "",
    //   //   Cost: "",
    //   //   StartTime: "",
    //   //   EndTime: "",
    //   //   CurrentCoursePaymentNumber: "",
    //   //   Image: null,
    // },
    // resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const CourseTechnology = useSelector(
    (state) => state.createCourseFilterSlice.CourseTechnology
  );

  const { CourseId } = useParams();
  // ** api call
  const { data, isLoading } = getData("getCourseTotal", "/Technology");
  useEffect(() => {
    if (!isLoading && data) {
      console.log("this is data", data);
      dispatch(
        setCourseTechnology(
          data?.map((item) => ({
            value: item.id,
            label: item.techName,
          }))
        )
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (CourseTechnology.length > 0) {
      setCurrentCourseTechnology(CourseTechnology[0]);
    }
  }, [CourseTechnology]);
  // ** States
  const { mutate: postDataMutate } = usePostDataTechnology(
    "putCourseTechnologyData"
  );
  const onSubmit = (data) => {
    let objData = [];
    if (CurrentCourseTechnology?.length > 0) {
      objData = CurrentCourseTechnology.map((item) => ({
        techId: item ? JSON.stringify(item.value) : null,
      }));
    }
    console.log("Sending data:", objData);
    console.log(CurrentCourseTechnology);
    postDataMutate(
      [
        `Course/AddCourseTechnology?courseId=${CourseId}`,
        objData,
        "application/json",
      ],
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
  const animatedComponents = makeAnimated();
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="mb-1" md="12">
                <Label className="form-label">کتگوری دوره</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={
                    CurrentCourseTechnology.length
                      ? CurrentCourseTechnology
                      : []
                  }
                  isMulti
                  options={CourseTechnology}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(data) => {
                    setCurrentCourseTechnology(data || []);
                  }}
                  placeholder="تکنولوژی را انتخاب کنید..."
                />
              </Col>
            </Row>
            <Button type="submit" color="primary" className="btn-next">
              <span className="align-middle d-sm-inline-block d-none">
                ثبت تغییرات
              </span>
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ChildrenModalCourseTotal;
