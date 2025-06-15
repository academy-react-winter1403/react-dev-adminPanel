import { Button, InputGroup, Row, Col, Input } from "reactstrap";
import { Search } from "react-feather";

const SearchQuery = ({ onChange, placeholder }) => {
  return (
    <Row>
      <Col lg={12}>
        <InputGroup>
          <Button color="primary" outline>
            <Search size={12} />
          </Button>
          <Input type="text" onChange={onChange} placeholder={placeholder} />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default SearchQuery;
