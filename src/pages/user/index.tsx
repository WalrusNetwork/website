import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Moment from "react-moment";
import moment from "moment";
import "moment-duration-format";

import NotFound from "../notfound";
import Ares from "./ares";
import SocialMedia from "./socialmedia";
import ComingSoon from "./comingsoon";
import { style } from "../../components/banner/random";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  query($username: String!) {
    users(username: $username) {
      uuid
      username
      online
      joined
      timePlayed
      groups {
        badge
        badgeColor
        badgeTextColor
      }
      ares {
        wins
        losses
        kills
        deaths
        wools
        monuments
        cores
        hills
        flags
      }
    }
  }
`;

export default function User() {
  let { url } = useParams();
  const { t } = useTranslation("profiles");

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username: url },
  });

  const kd = !data
    ? 1.0
    : data.users.ares.deaths === 0
    ? (
        Math.round((data.users.ares.kills / 1 + Number.EPSILON) * 100) / 100
      ).toFixed(2)
    : (
        Math.round(
          (data.users.ares.kills / data.users.ares.deaths + Number.EPSILON) *
            100
        ) / 100
      ).toFixed(2);

  const groups = !data
    ? []
    : data.users.groups.sort(
        (a: { priority: number }, b: { priority: number }) =>
          a.priority > b.priority ? -1 : 1
      );

  const timePlayed = !data
    ? "1"
    : moment.duration(Number(data.users.timePlayed), "seconds").format("H");

  if ((data && !data.users) || error) {
    return <NotFound />;
  } else {
    return (
      <Container
        className="profile"
        style={{ marginTop: 30, marginBottom: 30, minHeight: "60vh" }}
      >
        <CSSTransition in={!loading} timeout={200} classNames="blog-appearing">
          {loading ? (
            <Spinner className="spinner" animation="border" variant="primary" />
          ) : (
            <div>
              <Row>
                <Col lg={7} md={12} xs={12}>
                  <div className="user">
                    <img
                      className={
                        data.users.username.length > 12
                          ? "avatar over"
                          : "avatar"
                      }
                      alt=""
                      src={`https://cravatar.eu/helmavatar/${data.users.uuid}/150`}
                    />
                    <div className="username">
                      <h1
                        className={
                          data.users.username.length > 12 ? "over" : ""
                        }
                        style={{ color: "#" + groups[0].badgeColor }}
                      >
                        {data.users.username}
                      </h1>
                      <h3>
                        {groups.map(
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
                                  color: "#" + badgeTextColor,
                                  backgroundColor: "#" + badgeColor,
                                  marginRight: "10px",
                                }}
                              >
                                {badge}
                              </Badge>
                            )
                        )}
                        <Badge
                          pill
                          className={!data.users.groups[1] ? "" : "status"}
                          variant={data.users.online ? "success" : "danger"}
                        >
                          <span>
                            {data.users.online ? t("Online") : t("Offline")}
                          </span>
                        </Badge>
                      </h3>
                    </div>
                  </div>
                </Col>
                <Col lg="5">
                  <Row className="kills">
                    <Col xl="auto" lg="4" sm="auto" xs="auto">
                      <div className="kill">
                        <h1 className="over">{data.users.ares.kills}</h1>
                        <span>{t("Kills")}</span>
                      </div>
                    </Col>
                    <Col xl="auto" lg="5" sm="auto" xs="auto">
                      <div className="kill">
                        <h1 className="over">{data.users.ares.deaths}</h1>
                        <span>{t("Deaths")}</span>
                      </div>
                    </Col>
                    <Col xl="auto" lg="3" sm="auto" xs="auto">
                      <div className="kill">
                        <h1>{kd}</h1>
                        <span>K/D</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Card style={{ marginTop: "20px" }}>
                <Row>
                  <Col lg={3} xs={6} className="info">
                    <Card.Body>
                      <h3>
                        <FontAwesomeIcon icon="clock" /> {t("Joined")}
                      </h3>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            <Moment
                              locale={t("commons:locale")}
                              format="LLLL"
                              unix
                              date={data.users.joined / 1000}
                            />
                          </Tooltip>
                        }
                      >
                        <span>
                          <Moment
                            locale={t("commons:locale")}
                            fromNow
                            unix
                            date={data.users.joined / 1000}
                          />
                        </span>
                      </OverlayTrigger>
                    </Card.Body>
                  </Col>
                  <Col lg={3} xs={6} className="info">
                    <Card.Body>
                      <h3>
                        <FontAwesomeIcon icon="flag-checkered" /> {t("Wins")}
                      </h3>
                      <span>{data.users.ares.wins}</span>
                    </Card.Body>
                  </Col>
                  <Col lg={3} xs={6} className="info">
                    <Card.Body>
                      <h3>
                        <FontAwesomeIcon icon="frown" /> {t("Losses")}
                      </h3>
                      <span>{data.users.ares.losses}</span>
                    </Card.Body>
                  </Col>
                  <Col lg={3} xs={6} className="info">
                    <Card.Body>
                      <h3>
                        <FontAwesomeIcon icon="headset" /> {t("Time Played")}
                      </h3>
                      <span>
                        {timePlayed}
                        {timePlayed === "1"
                          ? " " + t("hour")
                          : " " + t("hours")}
                      </span>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col lg={9}>
                  <Tabs defaultActiveKey="ares" id="about-user">
                    <Tab eventKey="ares" title="Ares">
                      <Card style={{ borderTop: "none", marginTop: "-0.5px" }}>
                        <Card.Body className="about">
                          <Ares
                            kills={data.users.ares.kills}
                            deaths={data.users.ares.deaths}
                            kd={kd}
                            wools={data.users.ares.wools}
                            monuments={data.users.ares.monuments}
                            cores={data.users.ares.cores}
                            hills={data.users.ares.hills}
                            flags={data.users.ares.flags}
                          />
                        </Card.Body>
                      </Card>
                    </Tab>
                    <Tab eventKey="competitive" title={t("Competitive")}>
                      <Card style={{ borderTop: "none", marginTop: "-0.5px" }}>
                        <Card.Body className="about">
                          <ComingSoon />
                        </Card.Body>
                      </Card>
                    </Tab>
                    <Tab eventKey="uhc" title="UHC">
                      <Card style={{ borderTop: "none", marginTop: "-0.5px" }}>
                        <Card.Body className="about">
                          <ComingSoon />
                        </Card.Body>
                      </Card>
                    </Tab>
                    <Tab eventKey="arena" title="Arena">
                      <Card style={{ borderTop: "none", marginTop: "-0.5px" }}>
                        <Card.Body className="about">
                          <ComingSoon />
                        </Card.Body>
                      </Card>
                    </Tab>
                    <Tab eventKey="other" title={t("Other")}>
                      <Card style={{ borderTop: "none", marginTop: "-0.5px" }}>
                        <Card.Body className="about">
                          <ComingSoon />
                        </Card.Body>
                      </Card>
                    </Tab>
                  </Tabs>
                  {data.users.quote && (
                    <Jumbotron className="quote" style={style}>
                      <Container>
                        <h2>"{data.users.quote}"</h2>-{" "}
                        <i>{data.users.username}</i>
                      </Container>
                    </Jumbotron>
                  )}
                </Col>
                <Col lg={3}>
                  <div>
                    <h5>{t("Interests")}</h5>
                    <p>
                      {data.users.interests && data.users.interests.length > 0
                        ? data.users.interests
                        : t("Nothing here yet.")}
                    </p>
                  </div>
                  <hr className="friends" />
                  <div style={{ marginTop: "15px" }}>
                    <h5>
                      {t("Friends")}{" "}
                      <small>
                        {data.users.friends ? data.users.friends.length : "0"}
                      </small>
                    </h5>
                    <Row>
                      <Container>
                        {data.users.friends
                          ? data.users.friends.map(
                              ({
                                uuid,
                                username,
                              }: {
                                uuid: string;
                                username: string;
                              }) => (
                                <img
                                  className="friend-avatar"
                                  src={`https://cravatar.eu/helmavatar/${uuid}/57`}
                                  alt={username}
                                />
                              )
                            )
                          : t("This user has no friends")}
                      </Container>
                    </Row>
                  </div>
                  <SocialMedia
                    discord={data.users.discord}
                    facebook={data.users.facebook}
                    github={data.users.github}
                    gitlab={data.users.gitlab}
                    reddit={data.users.reddit}
                    skype={data.users.skype}
                    steam={data.users.steam}
                    twitch={data.users.twitch}
                    twitter={data.users.twitter}
                    youtube={data.users.youtube}
                  />
                </Col>
              </Row>
            </div>
          )}
        </CSSTransition>
      </Container>
    );
  }
}
