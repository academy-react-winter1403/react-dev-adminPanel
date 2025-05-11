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

const Switch = ({Primary}) => {
    const [checked, setChecked] = useState(Primary)
  return (
    <Card>
      <div className="demo-inline-spacing">
        <div className="form-check form-switch">
          <Input type="switch" name="customSwitch" id="exampleCustomSwitch" onChange={(change) => setChecked(change.target.checked)} checked={checked} />
        </div>
      </div>
    </Card>
  );
};
export default Switch;
