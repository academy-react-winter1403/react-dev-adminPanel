import { Col, Row } from "reactstrap";
// import UserTabs from "../../../../@core/components/common/Tabs/UserTabs";
import CardRoles from "../../../../@core/components/common/CardRoles/CardRoles";

const Preview = () => {
  return (
    <Row>
      <Col md={12}>
        <Row>
          <Col>
            <CardRoles />
          </Col>
          <Col>
            <CardRoles />
          </Col>
          <Col>
            <CardRoles />
          </Col>
          <Col>
            <CardRoles />
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <CardRoles />
        <CardRoles />
      </Col>
      <Col md={6}>
        <CardRoles />
        <CardRoles />
      </Col>
    </Row>
  );
};
export default Preview;
