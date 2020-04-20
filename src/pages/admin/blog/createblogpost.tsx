import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../app/auth";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { title } from "process";
import Form from "react-bootstrap/Form";
import { Alert, AlertContainer } from "react-bs-notifier";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_BLOG_POST = gql`
  mutation(
    $username: String!
    $slug: String!
    $enTitle: String!
    $enContent: String!
    $esTitle: String!
    $esContent: String!
  ) {
    createBlogPost(
      input: {
        username: $username
        slug: $slug
        content: [
          { title: $enTitle, locale: "en", content: $enContent }
          { title: $esTitle, locale: "es", content: $esContent }
        ]
      }
    ) {
      slug
      user {
        username
      }
    }
  }
`;

export default function CreateBlogPost(refetch: any) {
  const { t } = useTranslation();
  const { state } = useContext(AuthContext);

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  const [slug, setSlug] = useState("");
  const [username, setUsername] = useState(state.user.username);
  const [locale, setLocale] = useState("en");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [esTitle, setEsTitle] = useState("");
  const [esContent, setEsContent] = useState("");

  const handleClose = () => {
    setShow(false);
    setSlug("");
    setUsername("");
    setLocale("en");
    setEnTitle("");
    setEnContent("");
    setEsTitle("");
    setEsContent("");
  };
  const handleShow = () => setShow(true);

  const [createBlogPost] = useMutation(CREATE_BLOG_POST, {
    onCompleted() {
      handleClose();
      window.location.reload(true);
    },

    onError(error) {
      console.log("Error! " + error);
      setShowAlert(true);
    },
  });

  return (
    <>
      <Button className="float-right" variant="success" onClick={handleShow}>
        New Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ zIndex: 3000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Blog Post</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            if (
              username !== "" &&
              slug !== "" &&
              locale !== "" &&
              enTitle !== "" &&
              enContent !== ""
            ) {
              createBlogPost({
                variables: {
                  username,
                  slug,
                  locale,
                  title,
                  enTitle,
                  esTitle,
                  enContent,
                  esContent,
                },
              });

              setUsername("");
              setSlug("");
              setLocale("");
              setEnTitle("");
              setEnContent("");
              setEsTitle("");
              setEsContent("");
            }
          }}
        >
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    value={locale === "en" ? enTitle : esTitle}
                    onChange={(e: any) =>
                      locale === "en"
                        ? setEnTitle(e.target.value)
                        : setEsTitle(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="locale">
                  <Form.Label>Locale</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e: any) => setLocale(e.target.value)}
                  >
                    <option>en</option>
                    <option>es</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    placeholder="Slug"
                    onChange={(e: any) => setSlug(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="slug">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    placeholder="Username"
                    value={state.user.username}
                    onChange={(e: any) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows="15"
                value={locale === "en" ? enContent : esContent}
                onChange={(e: any) =>
                  locale === "en"
                    ? setEnContent(e.target.value)
                    : setEsContent(e.target.value)
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
