import {
  Row,
  Col,
  Button,
  Modal,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "@styles/react/libs/react-select/_react-select.scss";
import { useSelector } from "react-redux";
import * as yup from "yup";

const EditeUserInfoComp = ({
  data,
  show,
  setShow,
  refetch,
  submitUserUpdate,
}) => {
  // const userDetails = useSelector((state) => state.UserInfoSlice.details);

  const handleSubmit = (event) => {
    // submitUserUpdate({
    //   ...event,
    //   gender: event.gender === "true" ? true : false,
    // });
    submitUserUpdate(event)
    console.log(event)
  };

  const validation = yup.object({
    firstName: yup
      .string()
      .required("این فیلد اجباریست👌👌")
      .min(4, "تعداد کاراکتر حداقل 4 تا")
      .max(30, "تعداد کاراکتر حداکثر 30 تا"),
    lastName: yup
      .string()
      .required("این فیلد اجباریست👌👌")
      .min(4, "تعداد کاراکتر حداقل 4 تا")
      .max(30, "تعداد کاراکتر حداکثر 30 تا"),
    username: yup.string().required("این فیلد اجباریست👌👌"),
    email: yup.string().required("این فیلد اجباریست👌👌").test((value) => {
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailValidation.test(value)) return true
      return false
    }),
    nationalCode: yup.string().required("این فیلد اجباریست👌👌").test((value) => {
      const nationalCodeValidation = /^\d{10}$/
      if (nationalCodeValidation.test(value)) return true
      return false
    }),
    contact: yup.string().required("این فیلد اجباریست👌👌").test((value) => {
      const phoneNumberValidation = /^09\d{9}$/
      if (phoneNumberValidation.test(value)) return true
      return false
    })
  });

  const formFields = [
    { id: "firstName", label: "نام", props: { md: 6, xs: 12 } },
    { id: "lastName", label: "نام خانوادگی", props: { md: 6, xs: 12 } },
    { id: "username", label: "نام کاربری", props: { xs: 12 } },
    { id: "nationalCode", label: "کدملی", props: { md: 6, xs: 12 } },
    { id: "contact", label: "شماره موبایل", props: { md: 6, xs: 12 } },
    { id: "email", label: "ایمیل", props: { md: 8, xs: 12 } },
  ];

  const initialValues = {
    firstName: data?.fName,
    lastName: data?.lName,
    username: data?.userName,
    birthDay: data?.birthDay,
    email: data?.gmail,
    gender: data?.gender,
    nationalCode: data?.nationalCode,
    contact: data?.phoneNumber,
  };

  return (
    <Modal
      isOpen={show}
      toggle={() => setShow(!show)}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={() => setShow(!show)}
      ></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطاعات کاربر</h1>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          validationSchema={validation}
        >
          <Form>
            <Row className="gy-1 pt-75">
              {formFields.map((item, index) => (
                <Col key={index} {...item.props}>
                  <Label className="form-label" for={item.id}>
                    {item.label}
                  </Label>
                  <Field className="form-control" name={item.id} />
                  <ErrorMessage component={"p"} name={item.id} />
                </Col>
              ))}
              <Col md={4} xs={12}>
                <Label className="form-label" for="gender">
                  جنسیت:
                </Label>
                <Field
                  className="form-control react-select"
                  name="gender"
                  as="select"
                >
                  <option value={true}>مرد</option>
                  <option value={false}>زن</option>
                </Field>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ثبت
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default EditeUserInfoComp;
