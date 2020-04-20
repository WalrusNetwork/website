import React, { useState, useContext } from "react";
import { AuthContext } from "../../app/auth";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Fade from "react-bootstrap/Fade";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function Login() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };

  const handleShow = () => setShow(true);

  const LOGIN = gql`
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        uuid
        username
        email
        apiPermissions
      }
    }
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      dispatch({
        type: "LOGIN",
        payload: login,
      });

      setShow(false);
    },

    onError() {
      setOpen(true);
    },
  });

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Log In</NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            if (!(email === "") && !(password === "")) {
              login({
                variables: { email, password },
              });

              setEmail("");
              setPassword("");
            }
          }}
        >
          <Modal.Body>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your password with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/register">
              <Button variant="outline-primary" onClick={handleClose}>
                Sign Up
              </Button>
            </Link>
            <Button variant="primary" type="submit">
              {!loading ? "Log In" : "Logging In..."}
            </Button>
            <br />
            <Fade
              mountOnEnter={true}
              in={open}
              timeout={1000}
              onEntered={() =>
                setTimeout(() => {
                  setOpen(false);
                }, 1500)
              }
              unmountOnExit={true}
            >
              <pre>Uh oh! Something wrong has happened.</pre>
            </Fade>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
