import { Col, Row } from "reactstrap";
import CardDescription from "./../../../../@core/components/common/CardDescription/CardDescription";

const Details = ({ filedDetails = [] }) => {
  return (
    <Row>
      <Col md={6}>
        {filedDetails.slice(0, 2).map((item, index) => {
          return (
            <CardDescription
              Title={[item.title]}
              describe={[item.describe]}
              key={index}
            />
          );
        })}
      </Col>
      <Col md={6}>
        {filedDetails.slice(2, 4).map((item, index) => {
          return (
            <CardDescription
              Title={[item.title]}
              describe={[item.describe]}
              key={index + 2}
            />
          );
        })}
      </Col>
      <Col md={12}>
        {filedDetails.slice(4, 5).map((item, index) => {
          return (
            <CardDescription
              Title={[item.title]}
              describe={[item.describe]}
              key={index + 4}
            />
          );
        })}
      </Col>
    </Row>
  );
};
export default Details;
