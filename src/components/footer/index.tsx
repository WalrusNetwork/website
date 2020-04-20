import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Konami from "react-konami-code";
import "./styles.css";

export default function Footer() {
  const { t } = useTranslation("commons");
  const [copyright, setCopyright] = useState("Walrus LLC");

  const easterEgg = () => {
    setCopyright("Indicado");
  };

  return (
    <footer className="footer mt-4 pt-4 pb-4 py-4 bg-primary">
      <Container>
        <Row>
          <Col lg={5} xs={12}>
            <h4>{t("Our Mission")}</h4>
            <p>
              {t(
                "We want to help grow the competitive Minecraft world so that maybe one day we can watch skilled players compete in a PVP match on an eSports stage, or at the very least have some fun with competitive Minecraft."
              )}
            </p>
          </Col>
          <Col lg={4} xs={12}>
            <h4>{t("Links")}</h4>
            <Row>
              <Col lg={6} xs={12}>
                <ul className="m-0 p-0">
                  <li>
                    <Link to="/tos">{t("Terms of Service")}</Link>
                  </li>
                  <li>
                    <Link to="/privacy">{t("Privacy Policy")}</Link>
                  </li>
                  <li>
                    <Link to="/cookies">{t("Cookie Policy")}</Link>
                  </li>
                  <li>
                    <Link to="/punishments">{t("Punishments")}</Link>
                  </li>
                </ul>
              </Col>
              <Col lg={6} xs={12} style={{ marginBottom: "20px" }}>
                <ul className="m-0 p-0">
                  <li>
                    <Link to="/rules">{t("Player Rules")}</Link>
                  </li>
                  <li>
                    <Link to="/jobs">{t("Job Postings")}</Link>
                  </li>
                  <li>
                    <a href="https://docs.walrus.gg/">
                      {t("XML Documentation")}
                    </a>
                  </li>
                  <li>
                    <Link to="/staff">Staff</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={3} xs={12}>
            <h4>{t("Social Media")}</h4>
            <a href="https://twitter.com/walrus_gg">
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
            <Link to="/discord">
              <FontAwesomeIcon icon={["fab", "discord"]} />
            </Link>
            <a href="https://www.instagram.com/walrus_gg">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
            <a href="/">
              <FontAwesomeIcon icon={["fab", "facebook"]} />
            </a>
          </Col>
        </Row>
        <hr />
        <span className="text-muted">
          &copy; 2020 {copyright}
          <Konami action={easterEgg}></Konami>
        </span>
      </Container>
    </footer>
  );
}
