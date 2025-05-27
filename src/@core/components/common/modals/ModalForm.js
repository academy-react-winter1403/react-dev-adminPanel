// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

const ModalForm = ({ title, children }) => {
  // ** States
  const [formModal, setFormModal] = useState(false);

  return (
    <div>
      <div>
        <Button color="primary" onClick={() => setFormModal(!formModal)}>
          {title}
        </Button>
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setFormModal(!formModal)}>
            {title}
          </ModalHeader>
          <ModalBody>
            {children}
            <Row>
              <Col>
                <div className="mb-2">
                  <Label className="form-label" for="email">
                    Email:
                  </Label>
                  <Input type="email" id="email" placeholder="Email Address" />
                </div>
                <div className="mb-2">
                  <Label className="form-label" for="password">
                    Password:
                  </Label>
                  <Input type="password" id="password" placeholder="Password" />
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setFormModal(!formModal)}>
              ثبت تغییرات
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default ModalForm;
