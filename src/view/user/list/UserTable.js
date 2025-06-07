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
import { SortType } from "../../../@core/constants/filters/Filters";
import SelectReact from "../../../@core/components/common/Selection/Selection";
// import pic from "../../../@core/assets/photos/partial/01.jpg"

const UserTable = ({
  pic,
  fullName,
  createNewUserHandler,
  btnContentText,
  inputOptionClick,
  changeSearchInput,
  addBtnClick,
  secondBtnTextContent,
  secondBtnClick
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const rowOfPageOption = [
    // { value: "", label: "انتخاب کنید" },
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
      value: "",
      label: item.label,
    });
    console.log(value);
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

  const inputChangeHandler = (value) => {
    changeSearchInput(value.target.value);
  };

  const changeSelectActive = (value) => {
    inputOptionClick(value);
  };

  return (
    <Card className="h-auto p-0 mb-0">
      <CardHeader className="w-100 h-auto flex flex-row mb-0">
        <div
          className="w-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col md="2">
            <Row className="flex flex-row align-items-center">
              <Col md="2">
                <label>نمایش</label>
              </Col>
              <Col md="8">
                <SelectReact
                  SelectFilter={rowOfPageOption}
                  changeSelect={changeSelectActive}
                />
              </Col>
            </Row>
          </Col>
          <div className="d-flex gap-1">
            <div className="mt-2">
              <InputGroupButtons
                // onChange={(event) => {
                //   inputChangeHandler(event), queryInputChangeHandler(event);
                // }}
                onChange={inputChangeHandler}
              />
            </div>
            <div
              className="demo-inline-spacing mb-1"
              // onClick={() => navigate("")}
            >
              {btnContentText && <Button.Ripple color="primary" onClick={addBtnClick}>
                {btnContentText}
              </Button.Ripple>}
              {secondBtnTextContent && (
                <Button.Ripple color="primary" onClick={secondBtnClick}>
                  {secondBtnTextContent}
                </Button.Ripple>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <HeadLabelComp></HeadLabelComp>
    </Card>
  );
};

export default UserTable;
