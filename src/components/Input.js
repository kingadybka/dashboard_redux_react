import React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "formik";

const Input = ({
  field: { onChange, name, value },
  type,
  placeholder,
  controlId,
  required,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>
        {required && "* "}
        {placeholder}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage name={name} component="p" style={{ color: "#FF0000" }} />
    </Form.Group>
  );
};

export default Input;
