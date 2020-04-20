import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import CreateGroup from "./creategroup";
import AddUser from "./adduser";

const GET_GROUPS = gql`
  query {
    groups {
      name
      priority
      staff
      tag
      flair
      badge
      badgeColor
      badgeTextColor
      apiPermissions
    }
  }
`;

const MODIFY_GROUP = gql`
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
    modifyGroup(
      name: $name
      input: {
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

const DELETE_GROUP = gql`
  mutation($name: String!) {
    deleteGroup(name: $name)
  }
`;

export default function Groups() {
  const { loading, data, refetch } = useQuery(GET_GROUPS);

  const [show, setShow] = useState(false);

  const [priority, setPriority] = useState(0);
  const [name, setName] = useState("");
  const [staff, setStaff] = useState(false);
  const [tag, setTag] = useState("");
  const [flair, setFlair] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeColor, setBadgeColor] = useState("");
  const [badgeTextColor, setBadgeTextColor] = useState("");
  const [apiPermissions, setApiPermissions] = useState([""]);

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

  const [modifyGroup] = useMutation(MODIFY_GROUP, {
    onCompleted() {
      handleClose();
      refetch();
    },

    onError() {
      handleClose();
    },
  });

  const [deleteGroup] = useMutation(DELETE_GROUP, {
    onCompleted() {
      refetch();
    },
  });

  function onEditClick(
    priority: number,
    name: string,
    staff: boolean,
    tag: string,
    flair: string,
    badge: string,
    badgeColor: string,
    badgeTextColor: string,
    apiPermissions: string[]
  ) {
    setPriority(priority);
    setName(name);
    setStaff(staff);
    setTag(tag);
    setFlair(flair);
    setBadge(badge);
    setBadgeColor(badgeColor);
    setBadgeTextColor(badgeTextColor);
    setApiPermissions(apiPermissions);
    handleShow();
  }

  function handleDelete(name: string) {
    const result = window.confirm(
      "Are you sure you want to delete group " + name + "?"
    );
    if (result) {
      deleteGroup({
        variables: { name },
      });
    }
  }

  return (
    <>
      <Row>
        <Col md={9}>
          <h2 style={{ marginBottom: "30px" }}>
            Groups{" "}
            <small style={{ fontSize: "54%" }}>
              Different categories for users
            </small>
          </h2>
        </Col>
        <Col md={3}>
          <CreateGroup />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Name</th>
            <th>Badge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Spinner
              className="blog-spinner"
              animation="border"
              variant="primary"
            />
          ) : (
            data.groups.map(
              ({
                name,
                priority,
                staff,
                tag,
                flair,
                badge,
                badgeColor,
                badgeTextColor,
                apiPermissions,
              }: {
                name: string;
                priority: number;
                staff: boolean;
                tag: string;
                flair: string;
                badge: string;
                badgeColor: string;
                badgeTextColor: string;
                apiPermissions: any;
              }) => (
                <tr>
                  <td>{priority}</td>
                  <td style={{ fontWeight: staff ? 700 : 400 }}>
                    {name}
                    {staff && (
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            This group is considered to be staff
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon
                          icon="shield-alt"
                          style={{ marginLeft: "5px" }}
                        />
                      </OverlayTrigger>
                    )}
                  </td>
                  <td>
                    {badge ? (
                      <Badge
                        style={{
                          color: "#" + badgeTextColor,
                          backgroundColor: "#" + badgeColor,
                          marginRight: "10px",
                        }}
                      >
                        {badge}
                      </Badge>
                    ) : (
                      "No badge :("
                    )}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={() =>
                        onEditClick(
                          priority,
                          name,
                          staff,
                          tag,
                          flair,
                          badge,
                          badgeColor,
                          badgeTextColor,
                          apiPermissions
                        )
                      }
                    >
                      Edit
                    </Button>
                    <AddUser data={data} />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(name)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ zIndex: 3000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Group</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();

            if (name !== "" && priority !== 0 && flair !== "" && badge !== "") {
              modifyGroup({
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
                    value={priority.toString()}
                    placeholder="Priority"
                    onChange={(e: any) => setPriority(Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    placeholder="Name"
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="staff">
                  <Form.Label>Staff</Form.Label>
                  <Form.Check
                    isValid={staff}
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
                    value={tag}
                    placeholder="Tag"
                    onChange={(e: any) => setTag(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Flair">
                  <Form.Label>Flair</Form.Label>
                  <Form.Control
                    value={flair}
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
                    value={badge}
                    placeholder="The text of the group's website badge"
                    onChange={(e: any) => setBadge(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="badgeTextColor">
                  <Form.Label>Badge Text Color</Form.Label>
                  <Form.Control
                    value={badgeTextColor}
                    placeholder="Color of the text inside the group's website badge"
                    onChange={(e: any) => setBadgeTextColor(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="badgeColor">
                  <Form.Label>Badge Color</Form.Label>
                  <Form.Control
                    value={badgeColor}
                    placeholder="Color of the group's website badge"
                    onChange={(e: any) => setBadgeColor(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="apiPermissions">
              <Form.Label>API Permissions</Form.Label>
              <Form.Control
                value={
                  apiPermissions &&
                  apiPermissions
                    .join()
                    .split(",")
                    .join("\n")
                }
                as="textarea"
                placeholder="Permissions (one per line) that should be given on the website (and thus, the API) to users in this group."
                rows="15"
                onChange={(e: any) =>
                  setApiPermissions(e.target.value.split("\n"))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
