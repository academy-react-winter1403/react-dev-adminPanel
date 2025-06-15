import { Button, InputGroup, Row, Col, Input } from "reactstrap";
import { Search } from "react-feather";

const InputGroupButtons = ({ onChange, placeholder }) => {
  // const handleSearch = (search) => {
  //   searchQuery(search);
  // };

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
          <Input type="text" onChange={(event) => onChange(event)}/>
          
        </InputGroup>
      </Col>
    </Row>
  );
};

export default InputGroupButtons;
