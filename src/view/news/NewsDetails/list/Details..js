import { Col, Row } from "reactstrap";
import CardRoles from "../../../../@core/components/common/CardRoles/CardRoles";

const Details = () => {
  return (
    <Row>
      <Col md={6}>
        <CardRoles />
        <CardRoles />
      </Col>
      <Col md={6}>
        <CardRoles />
        <CardRoles />
      </Col>
      <Col md={12}>
        <CardRoles />
      </Col>
    </Row>
  );
};
export default Details;
