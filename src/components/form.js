import React from "react";
import { Form, Button } from "react-bootstrap";

export default function RegisterForm() {
  const initialState = {
    name: "",
    email: null,
    birthDate: null,
  };

  const [data, setData] = React.useState(initialState);

  const storagedData = JSON.parse(localStorage.getItem("stgData")) || [];

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    storagedData.push(data);
    localStorage.setItem("stgData", JSON.stringify(storagedData));
    setData(initialState);
  }

  return (
    <Form onSubmit={handleSubmit} className="pt-5">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Date</Form.Label>
        <Form.Control
          onChange={handleChange}
          name="birthDate"
          type="date"
          placeholder="Enter your birth date"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
