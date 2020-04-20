import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Banner from "../../components/banner";
import Sidebar from "../../components/sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";

import Blog from "./blog";

export default function Homepage() {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: "50vh" }}>
      <Helmet>
        <title>Walrus Network - {t("Home")}</title>
      </Helmet>
      <Banner />
      <Container style={{ marginBottom: 30 }}>
        <Row>
          <Col lg={9}>
            <Blog />
          </Col>
          <Col lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
