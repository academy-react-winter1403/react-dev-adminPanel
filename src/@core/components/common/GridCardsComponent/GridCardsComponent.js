// ** React Imports
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
  } from "reactstrap";
import AvatarIcons from "../AvatarIcons/AvatarIcons";
  
  const GridCardsComponent = ({ img }) => {
    return (
      <Col sm={4}>
        <Row className="match-height mb-2 ml-2">
          <Col>
            <Card className="position-relative">
              <AvatarIcons />
              <CardImg top src={img} alt="card"/>
              <CardBody>
                <CardTitle tag="h4">Card title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardBody>
              <CardFooter>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Col>
    );
  };
  
  export default GridCardsComponent;
  


  