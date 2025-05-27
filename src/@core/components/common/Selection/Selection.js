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

const SelectReact = ({changeSelect,SelectFilter}) => {
  const handleSelect = (type) => {
    changeSelect(type)
  }
  return (
    <Row>
      <Col >
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          defaultValue={SelectFilter[0]}
          options={SelectFilter}
          isClearable={false}
          onChange={handleSelect}
        />
      </Col>
    </Row>
  );
};
export default SelectReact;
