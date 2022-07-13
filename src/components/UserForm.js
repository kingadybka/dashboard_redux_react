import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Spinner } from "react-bootstrap";
import { useMatch, useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "./Input";
import { validate } from "../helpers";
import {
  addNewUser,
  editUser,
  fetchUser,
  clearUser,
} from "../store/usersSlice";

const UserForm = () => {
  const isCreate = useMatch("/add");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(({ users }) => users);

  useEffect(() => {
    if (!isCreate && id) {
      fetchUser({ id })(dispatch);
    }
    return () => dispatch(clearUser());
  }, []);

  const handleSubmit = (values) => {
    if (isCreate) {
      addNewUser({ values })(dispatch);
    } else {
      editUser({ values, id })(dispatch);
    }

    navigate("/");
  };

  return isLoading ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <Formik initialValues={user} validate={validate} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            component={Input}
            type="text"
            name="name"
            placeholder="Name"
            controlId="formName"
            required
          />
          <Field
            component={Input}
            type="text"
            name="username"
            placeholder="Username"
            controlId="formUsername"
          />
          <Field
            component={Input}
            type="text"
            name="address.city"
            placeholder="City"
            controlId="formCity"
          />
          <Field
            component={Input}
            type="email"
            name="email"
            placeholder="Email"
            controlId="formEmail"
            required
          />
          <div>
            <Link to="/" disabled={isSubmitting} className="btn btn-danger me-2">
              Cancel
            </Link>

            <Button variant="success" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
