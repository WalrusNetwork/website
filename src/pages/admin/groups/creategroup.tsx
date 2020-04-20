import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert, AlertContainer } from "react-bs-notifier";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CREATE_GROUP = gql`
  mutation(
    $name: String!
    $priority: Int!
    $staff: Boolean!
    $tag: String
    $flair: String!
    $badge: String!
    $badgeColor: String
    $badgeTextColor: String
    $apiPermissions: [String!]
  ) {
    createGroup(
      input: {
        name: $name
        priority: $priority
        staff: $staff
        tag: $tag
        flair: $flair
        badge: $badge
        badgeColor: $badgeColor
        badgeTextColor: $badgeTextColor
        apiPermissions: $apiPermissions
      }
    ) {
      id
    }
  }
`;

export default function CreateGroup() {
  const { t } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  const [priority, setPriority] = useState(0);
  const [name, setName] = useState("");
  const [staff, setStaff] = useState(false);
  const [tag, setTag] = useState("");
  const [flair, setFlair] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeColor, setBadgeColor] = useState("");
  const [badgeTextColor, setBadgeTextColor] = useState("");
  const [apiPermissions, setApiPermissions] = useState([]);

  const handleClose = () => {
    setShow(false);
    setPriority(0);
    setName("");
    setStaff(false);
    setTag("");
    setFlair("");
    setBadge("");
    setBadgeColor("");
    setBadgeTextColor("");
    setApiPermissions([]);
  };

  const handleShow = () => setShow(true);

  const handleStaffCheck = () => setStaff(!staff);

  const [createGroup] = useMutation(CREATE_GROUP, {
    onCompleted() {
      handleClose();
      window.location.reload(true);
    },

    onError(error) {
      setShowAlert(true);
    },
  });

  return (
    <>
      <Button className="float-right" variant="success" onClick={handleShow}>
        New Group
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ zIndex: 3000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            if (priority !== 0 && name !== "" && flair !== "" && badge !== "") {
              createGroup({
                variables: {
                  name,
                  priority,
                  staff,
                  tag,
                  flair,
                  badge,
                  badgeColor,
                  badgeTextColor,
                  apiPermissions,
                },
              });
            }
          }}
        >
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    placeholder="Priority"
                    onChange={(e: any) => setPriority(Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    onChange={(e: any) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="staff">
                  <Form.Label>Staff</Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="staff"
                    onChange={handleStaffCheck}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="Tag">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    placeholder="Tag"
                    onChange={(e: any) => setTag(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Flair">
                  <Form.Label>Flair</Form.Label>
                  <Form.Control
                    placeholder="Flair"
                    onChange={(e: any) => setFlair(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="badge">
                  <Form.Label>Badge Text</Form.Label>
                  <Form.Control
                    placeholder="The text of the group's website badge"
                    onChange={(e: any) => setBadge(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="badgeTextColor">
                  <Form.Label>Badge Text Color</Form.Label>
                  <Form.Control
                    placeholder="Color of the text inside the group's website badge"
                    onChange={(e: any) => setBadgeTextColor(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="badgeColor">
                  <Form.Label>Badge Color</Form.Label>
                  <Form.Control
                    placeholder="Color of the group's website badge"
                    onChange={(e: any) => setBadgeColor(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="apiPermissions">
              <Form.Label>API Permissions</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Permissions (one per line) that should be given on the website (and thus, the API) to users in this group."
                rows="15"
                onChange={(e: any) =>
                  setApiPermissions(e.target.value.split("\n"))
                }
              />
            </Form.Group>
            <Form.Label>
              Regular Minecraft permissions can be given after creating the
              group.
            </Form.Label>
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
