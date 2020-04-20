import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Link } from "react-router-dom";

import Sidebar from "../../components/sidebar";

import Title from "../../components/title";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

const GET_STAFF_USERS = gql`
  query {
    groups(staff: true) {
      name
      badgeColor
      users {
        uuid
        username
        role
      }
    }
  }
`;

export default function Staff() {
  const { t } = useTranslation("staff");
  const { loading, data } = useQuery(GET_STAFF_USERS);
  let staff: any = [];

  if (data && !loading) {
    for (const group of data.groups) {
      for (const user of group.users) {
        user.group = group;
      }
      Array.prototype.push.apply(staff, group.users);
    }
  }

  staff.sort((a: any, b: any) => a.username.localeCompare(b.username));

  return (
    <>
      <div style={{ minHeight: "70vh" }}>
        <Helmet>
          <title>Walrus Network - Staff</title>
        </Helmet>
        <Title
          title="Staff"
          subtitle={t("These folks help run and maintain the server")}
        ></Title>
        <Container>
          <Row>
            <Col md={9}>
              <CSSTransition
                in={!loading}
                timeout={200}
                classNames="guide-appearing"
              >
                {loading ? (
                  <Spinner
                    className="blog-spinner"
                    animation="border"
                    variant="primary"
                  />
                ) : (
                  <Row>
                    {staff.map((player: any) => (
                      <Col md={4} sm={6}>
                        <div className="staff-entry">
                          <Link to={`/${player.username}`}>
                            <img
                              src={`https://cravatar.eu/helmavatar/${player.uuid}/160`}
                              alt={player.username}
                              className="staff-head"
                            />
                            <div
                              style={{
                                color: "#" + player.group.badgeColor,
                                borderBottomColor:
                                  "#" + player.group.badgeColor,
                              }}
                              className="staff-username strong"
                            >
                              {player.username}
                            </div>
                            <div className="staff-role">
                              {player.role ? player.role : player.group.name}
                            </div>
                          </Link>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </CSSTransition>
            </Col>
            <Col md={3}>
              <Card style={{ marginBottom: "20px" }}>
                <Card.Body>
                  <Card.Title>{t("Need help?")}</Card.Title>
                  <Card.Text>
                    {t(
                      "Please contact a moderator. You can find them on this exact page. Don't worry, they don't bite!"
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
