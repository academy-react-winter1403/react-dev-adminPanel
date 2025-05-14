import { Button, InputGroup, Input, Row, Col } from "reactstrap";
import { Search } from "react-feather";

const InputGroupButtons = ({SearchQuery}) => {
  const handleSearch = (search) => {
    SearchQuery(search)
  }
  return (
    <Row>
      <Col lg={12} className="mb-1">
        <InputGroup>
          <Button color="primary" outline>
            <Search size={12} />
          </Button>
          <Input type="text" onChange={handleSearch}/>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default InputGroupButtons;
