import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import { InputCostume } from "../../../@core/components/common";
import { planOptions, roleOptions, sortingCol, statusOptions } from "../../../@core/components/constant";

const UserFilterBar = () => {
  const [roleValue, setRoleValue] = useState({
    value: "",
    label: "انتخاب کنید",
  });

  const [statusValue, setStatusValue] = useState({
    value: "",
    label: "انتخاب کنید",
  })

  const [activeInactiveValue, setActiveInactiveValue] = useState({
    value: "",
    label: "انتخاب کنید",
  })

  const [ascendingAndDescendingValue, setAscendingAndDescendingValue] = useState({
    value: "",
    label: "انتخاب کنید",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4"> فیلترها </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col className="my-md-0 my-1" md="3">
            <Label for="role-select"> فیلتر براساس نقش </Label>
            <InputCostume
              value={roleValue}
              option={roleOptions}
            />
          </Col>

          <Col md="3">
            <Label for="status-select" className="font-b-yekan">
              فیلتر براساس وضعیت
            </Label>
            <InputCostume
              value={statusValue}
              option={statusOptions}
            />
          </Col>
          <Col className="my-md-0 my-1" md="3">
            <Label for="plan-select"> فعال / غیرفعال </Label>
            <InputCostume
              value={activeInactiveValue}
              option={planOptions}
            />
          </Col>
          <Col className="my-md-0 my-1" md="3">
            <Label for="plan-select"> صعودی / نزولی </Label>
            <InputCostume
              value={ascendingAndDescendingValue}
              option={sortingCol}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserFilterBar;
