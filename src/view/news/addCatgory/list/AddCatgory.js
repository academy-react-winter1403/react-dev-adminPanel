import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import CardRoles from "../../../../@core/components/common/CardRoles/CardRoles";
import ModalForm from "../../../../@core/components/common/modals/ModalForm";
import SelectReact from "../../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";

const AddCatgory = () => {
  return (
    <Row>
      <Col md={4}>
        <CardRoles />
      </Col>
      <Card>
        <CardHeader>
          <div className="mt-2">
            <SelectReact />
          </div>
          <div className="d-flex gap-1">
            <div className="mt-2">
              <InputGroupButtons />
            </div>
            <div className="mb-1">
              <ModalForm />
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
  );
};
export default AddCatgory;
