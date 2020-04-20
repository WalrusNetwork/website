import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Alert, AlertContainer } from "react-bs-notifier";

const ADD_USER = gql`
  mutation($username: String!, $group: String!) {
    addUserToGroup(username: $username, groupName: $group) {
      username
    }
  }
`;

const REMOVE_USER = gql`
  mutation($username: String!, $group: String!) {
    removeUserFromGroup(username: $username, groupName: $group) {
      username
    }
  }
`;

export default function AddUser({ data }: { data: any }) {
  const { t } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [option, setOption] = useState("");

  const handleClose = () => {
    setShow(false);
    setUsername("");
    setGroup("");
  };
  const handleShow = () => {
    setShow(true);
    setOption("Add");
    setGroup(data.groups[0].name);
  };

  const [addUser] = useMutation(ADD_USER, {
    onCompleted() {
      handleClose();
      window.location.reload(true);
    },

    onError() {
      setShowAlert(true);
    },
  });

  const [removeUser] = useMutation(REMOVE_USER, {
    onCompleted() {
      handleClose();
      window.location.reload(true);
    },

    onError() {
      setShowAlert(true);
    },
  });

  return (
    <>
      <Button
        size="sm"
        variant="info"
        onClick={handleShow}
        style={{ marginRight: "5px" }}
      >
        Users
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Remove Users</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            if (username && group !== "") {
              if (option === "Add") {
                addUser({
                  variables: {
                    username,
                    group,
                  },
                });
              } else if (option === "Remove") {
                removeUser({
                  variables: {
                    username,
                    group,
                  },
                });
              }
            }
          }}
        >
          <Modal.Body>
            <Form.Group controlId="option">
              <Form.Label>Add/Remove</Form.Label>
              <Form.Control
                as="select"
                onChange={(e: any) => setOption(e.target.value)}
              >
                <option>Add</option>
                <option>Remove</option>
              </Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    onChange={(e: any) => setUsername(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="group">
                  <Form.Label>Group</Form.Label>
                  <Form.Control
                    onChange={(e: any) => setGroup(e.target.value)}
                    as="select"
                  >
                    {data.groups.map(
                      ({
                        name,
                        badgeColor,
                      }: {
                        name: String;
                        badgeColor: String;
                      }) => (
                        <option style={{ color: "#" + badgeColor }}>
                          {name}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <AlertContainer position="bottom-right">
        {showAlert ? (
          <Alert
            type="danger"
            headline="Error! :("
            onDismiss={() => setShowAlert(false)}
            timeout={1500}
          >
            {t("Something wrong happened. Please try again")}
          </Alert>
        ) : null}
      </AlertContainer>
    </>
  );
}
