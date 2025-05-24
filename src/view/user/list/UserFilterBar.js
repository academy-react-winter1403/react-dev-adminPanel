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
import {
  planOptions,
  roleOptions,
  sortingCol,
  statusOptions,
} from "../../../@core/components/constant";
import { useDispatch } from "react-redux";
import { changeUserFilterIsActiveUser, changeUserFilterRoleId, changeUserFilterSortingCol } from "./users/store/actions";
import { updateSearchParamsHook } from "../../../@core/hooks";
import { useSearchParams } from "react-router-dom";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";

const UserFilterBar = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [roleValue, setRoleValue] = useState({
    value: "",
    label: "انتخاب کنید",
  });

  const [statusValue, setStatusValue] = useState({
    value: "",
    label: "انتخاب کنید",
  });

  const [activeInactiveValue, setActiveInactiveValue] = useState({
    value: "",
    label: "انتخاب کنید",
  });

  const [ascendingAndDescendingValue, setAscendingAndDescendingValue] =
    useState({
      value: "",
      label: "انتخاب کنید",
    });

  const starusInputChangeHandler = (value) => {
    // console.log(value)
    if (value.label !==  "انتخاب کنید") {
      setStatusValue({ ...statusValue, label: value.label });
    }
    if (value.label === "فعال") {
      updateSearchParamsHook(setSearchParams, "IsActiveUser", true, dispatch, changeUserFilterIsActiveUser)
    }
    if (value.label === "غیرفعال") {
      updateSearchParamsHook(setSearchParams, "IsActiveUser", false, dispatch, changeUserFilterIsActiveUser)
    }
  };

  const roleInputChangeHandler = (value) => {
    // console.log(value)
    if (value.label !== "انتخاب کنید") {
      setRoleValue({ ...roleValue, label: value.label });
    }
    if (value.label === "ادمین") {
      updateSearchParamsHook(setSearchParams, "roleId", 1, dispatch, changeUserFilterRoleId)
    }
    if (value.label === "استاد") {
      updateSearchParamsHook(setSearchParams, "roleId", 2, dispatch, changeUserFilterRoleId)
    }
    if (value.label === "دانشجو") {
      updateSearchParamsHook(setSearchParams, "roleId", 5, dispatch, changeUserFilterRoleId)
    }
  };

  const activeInputChangeHandler = (value) => {
    console.log(value)
    if (value.label !== "انتخاب کنید") {
      setActiveInactiveValue({ ...activeInactiveValue, label: value.label });
    }
    // if (value.label !== "درصد تکمیل پروفایل") {
    //   updateSearchParamsHook(setSearchParams, "roleId", 5, dispatch, changeUserFilterRoleId)
    // }
    // if (value.label !== "تاریخ ایجاد کاربر") {
    //   updateSearchParamsHook(setSearchParams, "roleId", 5, dispatch, changeUserFilterRoleId)
    // }
  };

  const sortInputChangeHandler = (value) => {
    console.log(value)
    if (value.label !== "انتخاب کنید") {
      setAscendingAndDescendingValue({
        ...ascendingAndDescendingValue,
        label: value.label,
      });
    }
    if (value.label == "صعودی") {
      updateSearchParamsHook(setSearchParams, "SortingCol", "ASC", dispatch, changeUserFilterSortingCol)
    }
    if (value.label == "نزولی") {
      updateSearchParamsHook(setSearchParams, "SortingCol", "DESC", dispatch, changeUserFilterSortingCol)
    }
  };

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
              onChange={roleInputChangeHandler}
              value={roleValue}
              option={roleOptions}
            />
          </Col>

          <Col md="3">
            <Label for="status-select" className="font-b-yekan">
              فیلتر براساس وضعیت
            </Label>
            <InputCostume
              onChange={starusInputChangeHandler}
              value={statusValue}
              option={statusOptions}
            />
          </Col>
          <Col className="my-md-0 my-1" md="3">
            <Label for="plan-select"> فعال / غیرفعال </Label>
            <InputCostume
              onChange={activeInputChangeHandler}
              value={activeInactiveValue}
              option={planOptions}
            />
          </Col>
          <Col className="my-md-0 my-1" md="3">
            <Label for="plan-select"> صعودی / نزولی </Label>
            <InputCostume
              onChange={sortInputChangeHandler}
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
