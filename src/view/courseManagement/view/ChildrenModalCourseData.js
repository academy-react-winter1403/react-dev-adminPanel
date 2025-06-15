// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
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
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData, usePostData, usePutData } from "../../../@core/services/api";
import { setCourseStatus } from "../store/createCourseFilterSlice";

const ChildrenModalCourseData = () => {
  const [currentCourseStatus, setCurrentCourseStatus] = useState({});
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
  const courseStatus = useSelector(
    (state) => state.createCourseFilterSlice.courseStatus
  );
  const { CourseId } = useParams();
  // ** api call
  const { data, isLoading } = getData("getCourseData", "/Status");
  useEffect(() => {
    if (!isLoading && data) {
      console.log("this is data", data);
      dispatch(
        setCourseStatus(
          data?.map((item) => ({
            value: item.id,
            label: item.statusName,
          }))
        )
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (courseStatus.length > 0) {
      setCurrentCourseStatus(courseStatus[0]);
    }
  }, [courseStatus]);
  // ** States
  const { mutate: putDataMutate } = usePutData("putCourseStatusData");
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("CourseId", CourseId);
    formData.append("StatusId", currentCourseStatus.value);
    console.log(formData);
    putDataMutate(
      ["/Course/UpdateCourseStatus", formData, "multipart/form-data"],
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
    <Fragment>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="12">
                <Label for="role-select">وضعیت دوره</Label>
                <Select
                  isClearable={false}
                  value={currentCourseStatus}
                  options={courseStatus}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    setCurrentCourseStatus(data);
                  }}
                />
              </Col>
            </Row>
            <CardFooter className="mt-1">
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  ثبت تغییرات
                </span>
              </Button>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ChildrenModalCourseData;
