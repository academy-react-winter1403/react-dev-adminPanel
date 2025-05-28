import { Button, InputGroup, Input, Row, Col } from "reactstrap";
import { Search } from "react-feather";

const InputGroupButtons = ({ onChange, placeholder }) => {
  const handleSearch = (search) => {
    SearchQuery(search);
  };

  return (
    <Row>
      <Col lg={12} className="">
        <InputGroup
          onChange={(event) => onChange(event)}
          placeholder={placeholder}
        >
          <Button color="primary" outline>
            <Search size={12} />
          </Button>
          <Input type="text" onChange={handleSearch} />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default InputGroupButtons;
