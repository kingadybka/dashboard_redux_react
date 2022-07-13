import React from "react";
import { Container, Table, Card, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { PersonPlus, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { sort } from "../store/usersSlice";
import TableRow from "./TableRow";

const UserList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(({ users }) => users);

  const handleAscSort = () => dispatch(sort("asc"));
  const handleDescSort = () => dispatch(sort("desc"));

  return (
    <div>
      <Container className="mt-5">
        <Card className="shadow p-3 mb-4 bg-body rounded">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <h3>User list</h3>

              <Link to="/add" className="btn btn-success btn-lg">
                <PersonPlus className="align-middle me-1" />
                <span className="align-middle">Add User</span>
              </Link>
            </Card.Title>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                {data?.length ? (
                  <Table responsive className="align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>
                          Username
                          <button
                            onClick={handleAscSort}
                            className="border-0 customBtn"
                          >
                            <ChevronUp />
                          </button>
                          <button
                            onClick={handleDescSort}
                            className="border-0 customBtn"
                          >
                            <ChevronDown />
                          </button>
                        </th>
                        <th>City</th>
                        <th>Email</th>
                        <th className="text-center" colSpan={2}>
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(({ id, name, username, address, email }) => (
                        <TableRow
                          key={id}
                          id={id}
                          name={name}
                          username={username}
                          address={address}
                          email={email}
                        />
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div>No users found!</div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserList;
