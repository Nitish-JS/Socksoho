import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const CreateTask = ({ modal, toggle, updateTask, task }) => {
  const [taskValues, setTaskValues] = useState({
    name: "",
    description: "",
    deadline: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskValues({ ...taskValues, [name]: value });
  };

  useEffect(() => {
    setTaskValues(task);
  }, [task]);
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(taskValues);
    toggle();
  };
  return (
    <div>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                value={taskValues?.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                value={taskValues?.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={taskValues?.deadline}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTask;
