import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/usersSlice";

const TableRow = ({ id, name, username, address, email }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggle = () => setShow((prev) => !prev);

  const handleRemoveUser = () => removeUser({ id })(dispatch);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{username}</td>
        <td>{address?.city}</td>
        <td>{email}</td>
        <td className="text-end">
          <Link
            to={`/edit/${id}`}
            className="align-middle btn btn-primary"
          >
            <PencilSquare />
          </Link>
        </td>
        <td className="text-start">
          <Button className="border-0" variant="danger" onClick={toggle}>
            <Trash3 />
          </Button>
        </td>
      </tr>

      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Are you sure you want to delete this user?</strong>
          </p>
          <span>
            name: {name}, email: {email}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemoveUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableRow;
