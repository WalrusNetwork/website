import React, { useState } from "react";

import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Moment from "react-moment";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import CreateBlogPost from "./createblogpost";

const GET_BLOG_POSTS = gql`
  query($page: Int!) {
    blogPosts(page: $page, per_page: 10) {
      user {
        username
        groups {
          badge
          badgeColor
          badgeTextColor
        }
      }
      slug
      content {
        title
        content
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_LOCALE_BLOG_POST = gql`
  query($slug: String!, $locale: String!) {
    blogPosts(slug: $slug, locale: $locale) {
      slug
      content {
        title
        content
      }
    }
  }
`;

const MODIFY_BLOG_POST = gql`
  mutation(
    $username: String!
    $slug: String!
    $locale: String!
    $title: String!
    $content: String!
  ) {
    modifyBlogPost(
      input: {
        username: $username
        slug: $slug
        content: { locale: $locale, title: $title, content: $content }
      }
    ) {
      slug
    }
  }
`;

const DELETE_BLOG_POST = gql`
  mutation($slug: String!) {
    deleteBlogPost(slug: $slug)
  }
`;

export default function Blog() {
  const [page, setPage] = useState(0);

  const { loading, error, data, refetch } = useQuery(GET_BLOG_POSTS, {
    variables: { page },
  });

  const [show, setShow] = useState(false);

  const [slug, setSlug] = useState("");
  const [username, setUsername] = useState("");
  const [locale, setLocale] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => {
    setShow(false);
    setSlug("");
    setUsername("");
    setLocale("");
    setTitle("");
    setContent("");
  };
  const handleShow = () => setShow(true);

  const [modifyBlogPost] = useMutation(MODIFY_BLOG_POST, {
    onCompleted() {
      handleClose();
      refetch();
    },

    onError() {
      handleClose();
    },
  });

  const [deleteBlogPost] = useMutation(DELETE_BLOG_POST, {
    onCompleted() {
      refetch();
    },
  });

  const [getLocaleBlogPost] = useLazyQuery(GET_LOCALE_BLOG_POST, {
    onCompleted({ blogPosts }) {
      if (blogPosts[0] !== null) {
        setTitle(blogPosts[0].content[0].title);
        setContent(blogPosts[0].content[0].content);
      } else {
        setTitle("");
        setContent("");
      }
    },
  });

  function onEditClick(
    slug: string,
    username: string,
    title: string,
    content: any
  ) {
    setSlug(slug);
    setTitle(title);
    setUsername(username);
    setLocale("en");
    setContent(content);
    handleShow();
  }

  function handleLocaleChange(slug: string, locale: string) {
    setLocale(locale);
    getLocaleBlogPost({
      variables: { slug, locale },
    });
  }

  function handleDelete(title: string, slug: string) {
    const result = window.confirm(
      "Are you sure you want to delete post " + title + "?"
    );
    if (result) {
      deleteBlogPost({
        variables: { slug },
      });
    }
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <>
      <Row>
        <Col md={9}>
          <h2 style={{ marginBottom: "30px" }}>
            Blog Posts{" "}
            <small style={{ fontSize: "54%" }}>Posts on the home page</small>
          </h2>
        </Col>
        <Col md={3}>
          <CreateBlogPost />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Created</th>
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
            data.blogPosts.map(
              ({
                user,
                slug,
                content,
                createdAt,
              }: {
                user: any;
                slug: string;
                content: any;
                createdAt: number;
              }) => (
                <tr>
                  <td
                    style={{
                      color:
                        "#" +
                        user.groups.sort(
                          (a: { priority: number }, b: { priority: number }) =>
                            a.priority > b.priority ? -1 : 1
                        )[0].badgeColor,
                    }}
                  >
                    <img
                      src={
                        "https://cravatar.eu/helmavatar/" +
                        user.username +
                        "/20"
                      }
                      style={{ borderRadius: "2px" }}
                      alt={user.username}
                    />{" "}
                    {user.username}
                  </td>
                  <td>{content[0].title}</td>
                  <td>
                    <Moment unix fromNow locale="en" date={createdAt / 1000} />
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={() =>
                        onEditClick(
                          slug,
                          user.username,
                          content[0].title,
                          content[0].content
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(content[0].title, slug)}
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
      {data && page !== 0 && (
        <Button variant="primary" onClick={() => setPage(page - 1)}>
          Previous
        </Button>
      )}
      {data && data.blogPosts.length >= 11 && (
        <Button variant="primary" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        style={{ zIndex: 3000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            if (
              username !== "" &&
              slug !== "" &&
              locale !== "" &&
              title !== "" &&
              content !== ""
            ) {
              modifyBlogPost({
                variables: { username, slug, locale, title, content },
              });

              setUsername("");
              setSlug("");
              setLocale("");
              setTitle("");
              setContent("");
            }
          }}
        >
          <Modal.Body>
            <Form.Label>
              You can only modify a single locale's contents at a time.
            </Form.Label>
            <Row>
              <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="locale">
                  <Form.Label>Locale</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e: any) =>
                      handleLocaleChange(slug, e.target.value)
                    }
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
                    value={slug}
                    onChange={(e: any) => setSlug(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="slug">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    placeholder="Username"
                    value={username}
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
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
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
