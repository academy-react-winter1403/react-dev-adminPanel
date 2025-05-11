import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";

const BlogManagement = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col md={4}>
              <CardRoles />
            </Col>
            <Col md={4}>
              <CardRoles />
            </Col>
            <Col md={4}>
              <CardRoles />
            </Col>
          </Row>
        </Col>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center gap-1 a mt-2">
              <CardText>نمایش:</CardText>
              <SelectReact />
            </div>
            <div className="d-flex gap-1">
              <div className="mt-2">
                <InputGroupButtons />
              </div>
              <div className="mt-2">
                <SelectReact />
              </div>
              <div className="demo-inline-spacing mb-1">
                <Button.Ripple color="primary">Primary</Button.Ripple>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export />
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};

export default BlogManagement;
