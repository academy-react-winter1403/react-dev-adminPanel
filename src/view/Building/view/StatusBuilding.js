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
// import {
//   usePutData,
// } from "../../../../@core/services/api";
import { useSelector } from "react-redux";
import { usePutData } from "../../../@core/services/api";

const StatusBuilding = ({ isOpen, toggleFunction, selectedId , isActive }) => {
  const [currentCategory, setCurrentCategory] = useState({});
  const [preview, setPreview] = useState(null);
  // ** Yup Validation Schema
  //   const validationSchema = Yup.object().shape({
  //     CategoryName: Yup.string()
  //       .required("عنوان الزامی است")
  //       .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
  //       .max(100, "عنوان نباید بیش از ۱۰۰ کاراکتر باشد"),

  //     GoogleTitle: Yup.string()
  //       .notRequired()
  //       .min(40, "عنوان گوگل باید حداقل 40 کاراکتر باشد")
  //       .max(70, "عنوان گوگل نباید بیش از 70 کاراکتر باشد"),

  //     GoogleDescribe: Yup.string()
  //       .required("توضیح گوگل الزامی است")
  //       .min(50, "توضیح گوگل باید حداقل ۵۰ کاراکتر باشد")
  //       .max(160, "توضیح گوگل نباید بیش از ۱۶۰ کاراکتر باشد"),

  //     Image: Yup.mixed()
  //       .required("عکس الزامیست")
  //       .test("fileType", "فرمت فقط jpg یا png باشد", (value) => {
  //         return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
  //       })
  //       .test("fileSize", "حجم فایل باید کمتر از ۲ مگابایت باشد", (value) => {
  //         return value && value[0]?.size <= 2 * 1024 * 1024;
  //       }),
  //   });

  //   ** Hooks
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //     reset,
  //   } = useForm({
  //     defaultValues: {

  //     },
  //     resolver: yupResolver(validationSchema),
  //   });

  //   const id = useSelector((state) => state.BuildingListSlice.id);

  console.log("id card status", selectedId);

  const { mutate: putDataMutate } = usePutData("putCategoryData");
  const onSubmit = (data) => {
    const dataObj = {
      id: selectedId,
      active: !isActive,
    };
    console.log("test id", dataObj);
    putDataMutate(["/Building/Active", dataObj, "application/json"], {
      onSuccess: (data) => {
        console.log("Success:", data);
        toggleFunction();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleFunction}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleFunction}>Modal title</ModalHeader>
      <ModalBody>
        <Row>
          <h1>ایا میخواهید وضعیت ساختمان را تغییر دهید؟</h1>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col md={6}>
            <Button onClick={onSubmit}>تایید</Button>
          </Col>
          <Col md={6}>
            <Button>لغو</Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default StatusBuilding;
