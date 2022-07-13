import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserList, User } from "./components";
import { fetchUsers } from "./store/usersSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="add" element={<User title="Add User" />} />
        <Route path="edit/:id" element={<User title="Edit User" />} />
      </Routes>
    </div>
  );
};

export default App;

