import React, { Fragment } from "react";
import { Col, Label } from "reactstrap";
import Select from "react-select";

const InputCostume = ({ onChange, value, option, lable }) => {
  return (
    <Fragment>
        {/* <Col md="4"> */}
          {/* <Label for="role-select">{lable}</Label> */}
          <Select
            // theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={option}
            value={value}
            onChange={onChange}
          />
        {/* </Col> */}
    </Fragment>
  );
};

export default InputCostume;
