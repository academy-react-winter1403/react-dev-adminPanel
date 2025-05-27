// ** Reactstrap Imports
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Label,
} from "reactstrap";

const Switch = ({ Primary,checked }) => {

  const handleChange = (change) => {
    checked(change.target.checked);
  };
  return (
    <Card>
      <div className="demo-inline-spacing">
        <div className="form-check form-switch">
          <Input
            type="switch"
            name="customSwitch"
            id="exampleCustomSwitch"
            onChange={handleChange}
            checked={!!Primary}
          />
        </div>
      </div>
    </Card>
  );
};
export default Switch;
