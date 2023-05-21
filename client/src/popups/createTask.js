
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const CreateTask = ({ modal, toggle, saveTask }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    deadline: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCreate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      saveTask(values);
      setValues({
        name: "",
        description: "",
        deadline: "",
        isCompleted: false,
      });
      setErrors({ name: "", description: "", deadline: "" });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = "Task name is required";
    }
    if (!values.deadline.trim()) {
      errors.deadline = "Deadline is required";
    } else {
      const selectedDate = new Date(values.deadline);
      const currentDate = new Date();
      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        errors.deadline = "Deadline should be in the future";
      }
    }

    return errors;
  };

  return (
    <div>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                value={values?.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                value={values?.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={values?.deadline}
                onChange={handleChange}
                isInvalid={!!errors.deadline}
              />
              <Form.Control.Feedback type="invalid">
                {errors.deadline}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTask;
