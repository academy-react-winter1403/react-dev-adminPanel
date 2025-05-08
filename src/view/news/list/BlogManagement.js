import { Col, Container, Row } from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import GridCardsComponent from "../../../@core/components/common/GridCardsComponent/GridCardsComponent";

const BlogManagement = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
            <CardRoles />
            <CardRoles />
            <CardRoles />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-1">
              نمایش:
              <SelectReact />
            </div>
            <div className="d-flex align-items-center gap-1">
              مرتب سازی:
              <SelectReact />
              <SelectReact />
            </div>
          </div>
          <div className="py-2">
            <InputGroupButtons />
          </div>
          <Row className="d-flex flex-wrap ">
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogManagement;
