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
import {
  CustomPagination,
  InputCostume,
} from "../../../@core/components/common";
import HeadLabelComp from "./HeadLabelComp";
import { updateSearchParamsHook } from "../../../@core/hooks";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeUserFilterQuery,
  changeUserFilterRowsOfPage,
} from "./users/store/actions";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
// import pic from "../../../@core/assets/photos/partial/01.jpg"

const UserTable = ({ pic, fullName, createNewUserHandler, btnContentText }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const roleOptions = [
    { value: "", label: "انتخاب کنید" },
    { value: "admin", label: 10 },
    { value: "author", label: 20 },
    { value: "editor", label: 50 },
  ];

  const headLabelTextArray = [
    " کاربر ",
    " نام کاربر ",
    " نقش ",
    " ایمیل ",
    " درصد تکمیل پروفایل ",
    " وضعبت ",
    " اقدام ",
  ];

  const [value, setValue] = useState({
    value: "",
    label: "10",
  });

  const changeHandler = (item) => {
    console.log(item);
    setValue({
      ...value,
      label: item.label,
    });
    console.log(item);
    updateSearchParamsHook(
      setSearchParams,
      "RowsOfPage",
      item.label,
      dispatch,
      changeUserFilterRowsOfPage
    );
  };

  const queryInputChangeHandler = (value) => {
    console.log(value.target.value);
    if (value.target.value.length >= 3) {
      updateSearchParamsHook(
        setSearchParams,
        "Query",
        value.target.value,
        dispatch,
        changeUserFilterQuery
      );
    }
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
                {/* <Input
                  placeholder="جست و جو..."
                  onChange={queryInputChangeHandler}
                /> */}
                <InputGroupButtons
                  placeholder={"جست و جو..."}
                  onChange={queryInputChangeHandler}
                />
                {/* <input type="text"/> */}
              </Col>
              <Col md="4">
                <Button color="primary" onClick={createNewUserHandler}>
                  {btnContentText}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardHeader>
      <HeadLabelComp>

      </HeadLabelComp>
    </Card>
  );
};

export default UserTable;
