import { Card, CardBody, CardText, Col, Row } from "reactstrap";

const CardRoles = ({title,describe,icon}) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bolder mb-75">{title}</h3>
            <CardText>{describe}</CardText>
          </div>
          <div className="avatar avatar-stats p-50 m-0 bg-light-warning">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default CardRoles;
