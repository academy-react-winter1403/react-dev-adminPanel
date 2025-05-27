import { Col, Row } from "reactstrap";
import CardDescription from "../../../../@core/components/common/CardDescription/CardDescription";

const Preview = ({ filedPreview = [] }) => {
  return (
    <Row>
      <Col md={12}>
        <Row>
          {filedPreview.slice(0, 4).map((item, index) => {
            return (
              <Col key={index}>
                <CardDescription
                  Title={[item.title]}
                  describe={[item.describe]}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col md={6}>
        {filedPreview.slice(4, 6).map((item, index) => {
          return (
            <CardDescription
              key={index + 4}
              Title={[item.title]}
              describe={[item.describe]}
            />
          );
        })}
      </Col>
      <Col md={6}>
        {filedPreview.slice(6, 8).map((item, index) => {
          return (
            <CardDescription
              key={index + 6}
              Title={[item.title]}
              describe={[item.describe]}
            />
          );
        })}
      </Col>
    </Row>
  );
};
export default Preview;
