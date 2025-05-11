import { Book } from "react-feather";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";

const CardRoles = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bolder mb-75">title</h3>
            <CardText>describe</CardText>
          </div>
          <div className="avatar avatar-stats p-50 m-0 bg-light-warning">
            <Book size={30} color="red" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default CardRoles;
