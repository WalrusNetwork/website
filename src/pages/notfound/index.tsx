import React from "react";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./styles.css";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: "51vh" }}>
      <Container className="notfound">
        <Row>
          <Col lg={6}>
            <h1 className="text404 bounce-in-top">404</h1>
            <h1>{t("Uh oh chief!")}</h1>
            <h3>
              {t("Seems like you're lost. There's nothing here. Move along!")}
            </h3>
          </Col>
          <Col lg={6}>
            <img src="/404.png" alt="sup" width="350px" className="floating" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
