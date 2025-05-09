import { Col, Container, Row } from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import GridCardsComponent from "../../../@core/components/common/GridCardsComponent/GridCardsComponent";
import PaginationSeparated from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import TooltipControlled from "../../../@core/components/common/TooltipControlled/TooltipControlled";

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
              <TooltipControlled />
              <TooltipControlled />
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
          <Row className="d-flex flex-wrap">
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
            <GridCardsComponent />
          </Row>
          <div className="d-flex justify-content-center">
            <PaginationSeparated />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogManagement;
