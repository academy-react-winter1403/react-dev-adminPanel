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
import SelectReact from "../../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../../@core/constants/filters/Filters";

const AddCatgory = () => {
  return (
    <Container>
      <Row>
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
                <Button.Ripple color="primary">افزودن</Button.Ripple>
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
export default AddCatgory;
