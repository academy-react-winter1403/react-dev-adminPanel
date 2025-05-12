import { Col, Row } from "reactstrap";
import CardRoles from "../../../../@core/components/common/CardRoles/CardRoles";
import CardDescription from './../../../../@core/components/common/CardDescription/CardDescription';

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
        <CardDescription />
      </Col>
    </Row>
  );
};
export default Details;
