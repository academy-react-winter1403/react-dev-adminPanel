import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";
import { Activity, Book, XCircle, XOctagon } from "react-feather";

const BlogManagement = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col md={4}>
              <CardRoles describe={"مجموع اخبار و مقالات"} icon={<Book color="blue" />}/>
            </Col>
            <Col md={4}>
              <CardRoles describe={"اخبار و مقالات فعال"} icon={<Activity color="green" />}/>
            </Col>
            <Col md={4}>
              <CardRoles describe={"اخبار و مقالات غیر فعال"} icon={<XCircle />}/>
            </Col>
          </Row>
        </Col>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center gap-1 mt-1">
              <div>
                <CardText>نمایش:</CardText>
              </div>
              <div>
                <SelectReact SelectFilter={NumberCards} />
              </div>
            </div>
            <div className="d-flex gap-1">
              <div className="mt-2">
                <InputGroupButtons />
              </div>
              <div className="mt-2">
                <SelectReact SelectFilter={SortType} />
              </div>
              <div className="demo-inline-spacing mb-1">
                <Button.Ripple color="primary">افزودن اخبار</Button.Ripple>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export />
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};

export default BlogManagement;
