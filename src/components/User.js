import React from "react";
import { Container, Card } from "react-bootstrap";
import UserForm from "./UserForm";

const User = ({ title }) => (
  <Container className="mt-5" style={{ width: "40rem" }}>
    <Card className="shadow p-4 mb-4 bg-body rounded">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <UserForm />
      </Card.Body>
    </Card>
  </Container>
);

export default User;