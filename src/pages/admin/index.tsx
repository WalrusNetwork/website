import React from "react";
import Helmet from "react-helmet";

import Blog from "./blog/blog";
import Groups from "./groups/groups";

import Title from "../../components/title";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import "./styles.css";

export default function Admin() {
  return (
    <>
      <div style={{ minHeight: "70vh" }}>
        <Helmet>
          <title>Walrus Network - Admin Panel</title>
        </Helmet>
        <Title
          title="Admin Panel"
          subtitle="Shh! You've accessed in... Now be careful!"
        ></Title>
        <Container>
          <Tab.Container id="tabs" defaultActiveKey="home">
            <Row>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="home">
                    <img
                      src="https://i.imgur.com/Zs3j6AR.png"
                      alt=""
                      style={{
                        maxWidth: "100%",
                        borderRadius: "25px",
                        marginBottom: "20px",
                      }}
                    />
                    <h1>Network Dashboard</h1>
                    <p>
                      The dashboard is designed for network-wide administration
                      (and thus contains sensitive information and actions –
                      access should only be granted to trusted individuals).
                    </p>

                    <p>
                      Here, you can manage groups, blogs, servers, and player
                      connections (IPs).
                    </p>

                    <p>
                      Groups: add or remove players from various groups. Every
                      group has a certain set of in-game and web permissions, as
                      well as an associated priority level. The theory is that,
                      the higher the priority, the more permissions the group is
                      attributed. You may also edit groups themselves.
                    </p>

                    <p>Blogs: put up, take down or edit blog posts.</p>

                    <p>
                      Servers [WIP]: Put up, take down and monitor servers and
                      their health. You may also whitelist servers here.
                    </p>

                    <p>
                      Connections & IPs [WIP]: blacklist IP ranges or individual
                      IP addresses to block malicious users or unwanted
                      connections.
                    </p>

                    <p>
                      You can severely damage the network with accidental or
                      unwanted actions, so if you are unsure about an action,
                      ask a developer for help. Better to be safe than sorry.
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="blog">
                    <Blog />
                  </Tab.Pane>
                  <Tab.Pane eventKey="groups">
                    <Groups />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="home">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="blog">Blog</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="groups">Groups</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
}
