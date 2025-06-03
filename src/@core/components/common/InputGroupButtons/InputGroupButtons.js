import { Button, InputGroup, Row, Col, Input } from "reactstrap";
import { Search } from "react-feather";
import Input_ from "postcss/lib/input";

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
          {/* <input type="text" className="border-primary text-light" style={{outline: "none", background: "transparent"}}/> */}
          
        </InputGroup>
      </Col>
    </Row>
  );
};

export default InputGroupButtons;
