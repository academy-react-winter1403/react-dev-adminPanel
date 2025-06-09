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
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default ModalForm;
