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

const CardDescription = () => {
  return (
    <Fragment>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h4">Card Title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CardDescription;
