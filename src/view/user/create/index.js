import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

// Constants
import { CreateUserModalFields } from "../../../@core/components/constant/user/index";
import { createUserPost } from "../../../@core/services/api";
import toast from "react-hot-toast";

const CreateNewUser = ({ open, toggleSidebar, setSidebarOpen }) => {
  const [roleCheckBox, setRoleCheckBox] = useState("isStudent");

  const { mutate } = createUserPost("createUser");

  const createUserHandler = (event) => {
    console.log(event);
    const dataObj = {
      lastName: event.lastName,
      firstName: event.firstName,
      gmail: event.gmail,
      password: event.password,
      phoneNumber: event.phoneNumber
    }
    mutate(["/User/CreateUser", dataObj], {
      onSuccess: (response) => {
        toast.success(response.message)
        setSidebarOpen(false)
      },
      onError: (error) => {
        console.log(error)
        // toast.error(error)
      }
    })
  };

  const hideForm = () => {
    setSidebarOpen(false)
  }

  // Initial Values For Form
  const initialValues = {
    lastName: "",
    firstName: "",
    gmail: "",
    phoneNumber: "",
    password: "",
  };

  const validation = yup.object({
    firstName: yup
      .string()
      .max(20, "تعداد کاراکتر حداقل 20")
      .required("این فیلد اجباریست🤔🤔"),
    lastName: yup
      .string()
      .max(20, "تعداد کاراکتر حداقل 20")
      .required("این فیلد اجباریست🤔🤔"),
    gmail: yup
      .string()
      .test("gmail", "این ایمیل نامعتبر میباشد", (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;
      })
      .required("این فیلد اجباریست🤔🤔"),
    phoneNumber: yup
      .string()
      .test("phoneNumber", "شماره تلفن نامعتبر است", (value) => {
        if (!value) return false;
        const phoneRegex = /^09[0-9]{9}$/;
        if (phoneRegex.test(value)) return true;
      })
      .required("این فیلد اجباریست🤔🤔"),
    password: yup.string().required("این فیلد اجباریست🤔🤔"),
  });

  return (
    <div className="vertically-centered-modal">
      <Modal isOpen={open} toggle={() => setSidebarOpen(!open)}>
        <ModalHeader
          className="pt-2 fw-bolder"
          toggle={() => setSidebarOpen(!open)}
        >
          لطفا اطلاعات کاربر را وارد نمایید
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={createUserHandler}
            validationSchema={validation}
          >
            <Form>
              {CreateUserModalFields.map((item, index) => (
                <div key={index} className="mb-1">
                  <Label className="form-label" for="firstName">
                    {item.label}
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="form-control"
                  />
                  <ErrorMessage component={"p"} className="" name={item.name} />
                </div>
              ))}
              <Label className="form-label" for="user-role">
                تعیین نقش کاربر
              </Label>
              <Field
                as="select"
                name="role"
                onChange={(e) => {
                  setRoleCheckBox(e.target.value);
                }}
                className="form-select mb-2"
              >
                <option value="isStudent">دانشجو</option>
                <option value="isTeacher">استاد</option>
              </Field>
              <Button type="submit" className="me-1" color="primary">
                ثبت
              </Button>
              <Button
                // type="submit"
                color="secondary"
                outline
                onClick={hideForm}
              >
                انصراف
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateNewUser;
