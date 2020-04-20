import React from "react";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import "moment/locale/es";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Tooltip from "react-bootstrap/Tooltip";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ReactMarkdown from "react-markdown";
import { CSSTransition } from "react-transition-group";

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "40%" }} alt="" />;
}

const GET_BLOG_POSTS = gql`
  query($locale: String!) {
    blogPosts(page: 0, per_page: 3, locale: $locale) {
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

export default function Blog() {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(GET_BLOG_POSTS, {
    variables: { locale: t("locale") },
  });

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <CSSTransition in={!loading} timeout={200} classNames="blog-appearing">
      <div className="blog">
        {loading || data.blogPosts.length === 0 ? (
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
              createdAt: any;
            }) => (
              <Card border="primary">
                <Card.Header>
                  {user ? (
                    <div>
                      <a href="/" className="avatar">
                        <img
                          alt={user.username}
                          src={
                            "https://cravatar.eu/helmavatar/" +
                            user.username +
                            "/45"
                          }
                          className="author-avatar"
                        />
                      </a>
                      <div className="author">
                        <a
                          href={"/" + user.username}
                          className="author-name"
                          style={{
                            color:
                              "#" +
                              user.groups.sort(
                                (
                                  a: { priority: number },
                                  b: { priority: number }
                                ) => (a.priority > b.priority ? -1 : 1)
                              )[0].badgeColor,
                          }}
                        >
                          {user.username}
                        </a>
                        <br />
                        <div style={{ direction: "rtl" }}>
                          {user.groups.map(
                            ({
                              badge,
                              badgeColor,
                              badgeTextColor,
                            }: {
                              badge: string;
                              badgeColor: string;
                              badgeTextColor: string;
                            }) =>
                              badge && (
                                <Badge
                                  style={{
                                    backgroundColor: "#" + badgeColor,
                                    color: "#" + badgeTextColor,
                                    marginLeft: "5px",
                                    float: "left",
                                  }}
                                  className="author-rank"
                                >
                                  {badge}
                                </Badge>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <a href="/" className="avatar">
                        <img
                          alt="Walrus"
                          src="https://cravatar.eu/helmavatar/Cobol72/45"
                          className="author-avatar"
                        />
                      </a>
                      <div className="author">
                        <a href="/" className="author-name">
                          Walrus
                        </a>
                        <br />
                        <span className="badge walrus-rank">Walrus</span>
                      </div>
                    </div>
                  )}
                  <span className="title">{content[0].title}</span>
                  <br />
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        <Moment
                          locale={t("locale")}
                          format="LLLL"
                          unix
                          date={createdAt / 1000}
                        />
                      </Tooltip>
                    }
                  >
                    <small>
                      <Moment
                        unix
                        locale={t("locale")}
                        fromNow
                        date={createdAt / 1000}
                      />
                    </small>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <ReactMarkdown
                      source={
                        content[0].content.length >= 500
                          ? content[0].content.substring(0, 500) + "..."
                          : content[0].content
                      }
                      skipHtml={true}
                      renderers={{ image: Image }}
                    />
                  </Card.Text>
                </Card.Body>
                {content[0].content.length >= 500 && (
                  <Card.Footer className="read-more">
                    <Button href={"/blog/" + slug}>
                      <p>{t("homepage:Read")}</p>
                    </Button>
                  </Card.Footer>
                )}
              </Card>
            )
          )
        )}
      </div>
    </CSSTransition>
  );
}
