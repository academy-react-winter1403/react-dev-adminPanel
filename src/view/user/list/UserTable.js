import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import Avatar from "@components/avatar";
import { CustomPagination, InputCostume } from "../../../@core/components/common";
import HeadLabelComp from "./HeadLabelComp";
// import pic from "../../../@core/assets/photos/partial/01.jpg"

export const labelComp = () => {
  return (
    <CardHeader>
      <Row>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
        <Col>
          <label>کاربر</label>
        </Col>
      </Row>
    </CardHeader>
  );
};

const UserTable = ({ pic, fullName, createNewUserHandler }) => {
  const roleOptions = [
    { value: "", label: "انتخاب کنید" },
    { value: "admin", label: 10 },
    { value: "author", label: 20 },
    { value: "editor", label: 50 },
  ];

  const [value, setValue] = useState({
    value: "",
    label: "10",
  });

  const changeHandler = (item) => {
    setValue({
      ...value,
      label: item.label,
    });
  };

  return (
    <Card className="h-auto p-0">
      <CardHeader className="w-100 h-auto flex flex-row">
        <Row className="w-100 flex-row justify-content-between">
          <Col md="2">
            <Row className="flex flex-row align-items-center">
              <Col md="2">
                <label>نمایش</label>
              </Col>
              <Col md="8">
                <InputCostume
                  option={roleOptions}
                  value={value}
                  onChange={changeHandler}
                />
              </Col>
            </Row>
          </Col>
          <Col className="search-and-btn-control" md="5">
            <Row className="flex flex-row">
              <Col md="8">
                <Input placeholder="جست و جو..." />
              </Col>
              <Col md="4">
                <Button color="primary" onClick={createNewUserHandler}>افزودن کاربر جدید</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardHeader>
      <HeadLabelComp />
    </Card>
  );
};

export default UserTable;
