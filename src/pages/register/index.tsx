import React, { useState, useEffect } from "react";
import Stepper from "bs-stepper";
import Helmet from "react-helmet";
import { Alert, AlertContainer } from "react-bs-notifier";

import Title from "../../components/title";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./styles.css";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function Register() {
  const [stepper, setStepper] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [response, setResponse] = useState();

  const SIGNUP = gql`
    mutation(
      $token: Int!
      $username: String!
      $email: String!
      $password: String!
    ) {
      signup(
        token: $token
        username: $username
        email: $email
        password: $password
      ) {
        username
        email
      }
    }
  `;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [signup, { loading }] = useMutation(SIGNUP, {
    onCompleted({ signup }) {
      setResponse(signup);
      handleShow();
    },

    onError(error) {
      setShowAlert(true);
      console.log(error);
    },
  });

  useEffect(() => {
    setStepper(
      new Stepper(document.querySelector("#register-steps") as HTMLElement, {
        linear: false,
        animation: true,
      })
    );
  }, []);

  return (
    <>
      <div style={{ minHeight: "70vh" }}>
        <Helmet>
          <title>Walrus Network - Sign Up</title>
        </Helmet>
        <Title
          title="Sign Up"
          subtitle="Want to customize your profile? Sign up here!"
        ></Title>
        <Container>
          <div id="register-steps" className="bs-stepper">
            <div className="bs-stepper-header">
              <div className="step" data-target="#test-l-1">
                <button className="step-trigger">
                  <span className="bs-stepper-circle">1</span>
                  <span className="bs-stepper-label">Join the server</span>
                </button>
              </div>
              <div className="line"></div>
              <div className="step" data-target="#test-l-2">
                <button className="step-trigger">
                  <span className="bs-stepper-circle">2</span>
                  <span className="bs-stepper-label">Introduce a token</span>
                </button>
              </div>
              <div className="line"></div>
              <div className="step" data-target="#test-l-3">
                <button className="step-trigger">
                  <span className="bs-stepper-circle">3</span>
                  <span className="bs-stepper-label">Fill your details</span>
                </button>
              </div>
            </div>
            <div className="bs-stepper-content">
              <Form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  if (token && username && email && password) {
                    let parsedToken = Number(token);

                    signup({
                      variables: {
                        token: parsedToken,
                        username,
                        email,
                        password,
                      },
                    });
                  }
                }}
              >
                <div id="test-l-1" className="content">
                  <p>ENTER THE SERVER XD</p>
                  <Button onClick={() => stepper.next()}>Next</Button>
                </div>
                <div id="test-l-2" className="content">
                  <Form.Group controlId="formToken">
                    <Form.Label>Token</Form.Label>
                    <Form.Control
                      placeholder="Enter token"
                      onChange={(e: any) => setToken(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={() => stepper.next()}>Next</Button>
                </div>
                <div id="test-l-3" className="content">
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Username"
                      onChange={(e: any) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Your Minecraft Username.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Please ensure that this email is valid. We'll need you to
                      verify it.
                    </Form.Text>
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
                  <Button variant="primary" type="submit">
                    {!loading ? "Sign Up" : "Signing Up..."}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Howdy sir!{" "}
            <span role="img" aria-label="Cowboy Emoji">
              🤠
            </span>
          </Modal.Title>
        </Modal.Header>
        {response && (
          <Modal.Body>
            <p>
              Hello {response.username}!
              <br />
              <br />
              In order to complete registration, check your inbox at{" "}
              <code>{response.email}</code>. We've sent you an email with a URL
              that you may use to verify yourself.
              <br />
              <br />
              Have a nice day!
              <br />
              Walrus
            </p>
          </Modal.Body>
        )}
      </Modal>
      <AlertContainer position="bottom-right">
        {showAlert ? (
          <Alert
            type="danger"
            headline="Error! :("
            onDismiss={() => setShowAlert(false)}
            timeout={1500}
          >
            Something wrong happened. Please try again
          </Alert>
        ) : null}
      </AlertContainer>
    </>
  );
}
