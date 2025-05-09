// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'

const ModalForm = () => {
  // ** States
  const [formModal, setFormModal] = useState(false)

  return (
    <div className='demo-inline-spacing'>
      <div>
        <Button color='primary' outline onClick={() => setFormModal(!formModal)}>
          Login Form
        </Button>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setFormModal(!formModal)}>Login Form</ModalHeader>
          <ModalBody>
            <div className='mb-2'>
              <Label className='form-label' for='email'>
                Email:
              </Label>
              <Input type='email' id='email' placeholder='Email Address' />
            </div>
            <div className='mb-2'>
              <Label className='form-label' for='password'>
                Password:
              </Label>
              <Input type='password' id='password' placeholder='Password' />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => setFormModal(!formModal)}>
              Login
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
export default ModalForm
