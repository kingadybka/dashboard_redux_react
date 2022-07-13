// import React, { useEffect, useState } from "react";
// import { Container, Navbar, Spinner } from "react-bootstrap";
// import UserList from "./features/users/UserList";
// import { AddUser } from "./features/users/AddUser";
// import { EditUser } from "./features/users/EditUser";
// import { Route, Routes, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUsers } from "./store/usersSlice";

// const App = () => {
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector(({ users }) => users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, []);

//   return (
//     <div className="App">
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="/">Dashboard</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <Routes>
//         <Route exact path="/" element={<UserList />} />
//         <Route path="add" element={<AddUser />} />
//         <Route path="edit/:id" element={<EditUser />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


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
  }, []);

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

