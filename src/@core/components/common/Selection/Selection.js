// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
} from "reactstrap";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

const SelectReact = () => {
  return (
    <Row>
      <Col >
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          options={colourOptions}
          isClearable={false}
        />
      </Col>
    </Row>
  );
};
export default SelectReact;
