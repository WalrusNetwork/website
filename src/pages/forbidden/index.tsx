import React from "react";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../notfound/styles.css";

export default function Forbidden() {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: "51vh" }}>
      <Container className="notfound">
        <Row>
          <Col lg={6}>
            <h1 className="text404 bounce-in-top">403</h1>
            <h1>{t("Houston, we have a problem...")}</h1>
            <h3>
              {t(
                "You don't have the required permissions to access this part of the website. Move along!"
              )}
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
