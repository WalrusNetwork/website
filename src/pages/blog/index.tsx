import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Moment from "react-moment";
import "moment/locale/es";

import Title from "../../components/title";
import Spinner from "react-bootstrap/Spinner";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import NotFound from "../notfound";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ReactMarkdown from "react-markdown";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

const QUERY_BLOG_POST = gql`
  query($slug: String!, $locale: String!) {
    blogPosts(slug: $slug, locale: $locale) {
      user {
        username
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

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "40%" }} alt="" />;
}

export default function Blog() {
  const { t } = useTranslation(["commons", "guides"]);
  let { url } = useParams();
  let locale = t("locale");

  const { loading, error, data } = useQuery(QUERY_BLOG_POST, {
    variables: { slug: url, locale },
  });

  if (error) {
    return <p>Error :(</p>;
  }

  if (data && data.blogPosts.length === 0) {
    return <NotFound />;
  } else {
    return (
      <div style={{ minHeight: "70vh" }}>
        <CSSTransition in={!loading} timeout={200} classNames="blog-appearing">
          {loading ? (
            <Spinner className="spinner" animation="border" variant="primary" />
          ) : (
            <div>
              <Helmet>
                <title>
                  Walrus Network - {data.blogPosts[0].content[0].title}
                </title>
              </Helmet>
              <Title
                title={data.blogPosts[0].content[0].title}
                subtitle={
                  <div>
                    <Moment
                      locale={t("locale")}
                      format="LL"
                      unix
                      date={data.blogPosts[0].createdAt / 1000}
                    />{" "}
                    {t("blog:by")}{" "}
                    {data.blogPosts[0].user !== null ? (
                      <a href={data.blogPosts[0].user.username}>
                        {data.blogPosts[0].user.username}
                      </a>
                    ) : (
                      "Walrus"
                    )}
                  </div>
                }
              />
              <Container>
                <Row>
                  <Col lg="9" style={{ wordBreak: "break-word" }}>
                    <ReactMarkdown
                      source={data.blogPosts[0].content[0].content}
                      escapeHtml={false}
                      renderers={{ image: Image }}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </CSSTransition>
      </div>
    );
  }
}
