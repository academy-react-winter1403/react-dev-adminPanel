import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useGetDataWithParams } from "../../../../@core/services/api";

const DetailsFormModal = ({ isOpen, toggleFunction, selectedId }) => {

  const { data: allData, isLoading } = useGetDataWithParams(
    "DetailCategory",
    `News/GetNewsCategory/${selectedId}`,
    selectedId ? true : false
  );
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleFunction}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleFunction}>جزئیات دسته بندی</ModalHeader>
      <ModalBody>
          <Row>
            <Col md="12" className="mb-1">
              <Label>عنوان دسته</Label>
              <div>{allData?.categoryName}</div>
            </Col>
            <Col md="12" className="mb-1">
              <Label>تاریخ ثبت</Label>
              <div>{allData?.insertDate}</div>
            </Col>
            <Col md="12" className="mb-1">
              <Label>عنوان گوگل</Label>
              <div>{allData?.googleTitle}</div>
            </Col>
            <Col md="12" className="mb-1">
              <Label>توضیحات گوگل</Label>
              <div>{allData?.googleDescribe}</div>
            </Col>
          </Row>
        <ModalFooter>
          <div className="d-flex justify-content-between">
            <Button color="secondary" onClick={toggleFunction}>
              بستن
            </Button>
          </div>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default DetailsFormModal;
