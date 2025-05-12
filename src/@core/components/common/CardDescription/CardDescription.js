// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardImg,
  CardLink,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
} from "reactstrap";

const CardDescription = ({Title,describe}) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h4">{Title}</CardTitle>
              <CardText>
                {describe}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CardDescription;
