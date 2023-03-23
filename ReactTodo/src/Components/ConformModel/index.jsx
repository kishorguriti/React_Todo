import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function ConformModel(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => props.onClose(true);
  const handleShow = () => props.onClose(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conformation Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure , do You want to delete This Todo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConformModel;
