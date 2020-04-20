import React from "react";
import { useTranslation } from "react-i18next";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Ares(props: any) {
  const { t } = useTranslation("profiles");
  return (
    <Row>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/steve.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.kills}</h3>
            <small>{t("kills")}</small>
          </div>
        </div>
      </Col>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/skull.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.deaths}</h3>
            <small>{t("deaths")}</small>
          </div>
        </div>
      </Col>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/kd.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.kd}</h3>
            <small>K/D</small>
          </div>
        </div>
      </Col>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/wool.gif" alt="" className="block" />
          <div className="stats">
            <h3>{props.wools}</h3>
            <small>{t("wools")}</small>
          </div>
        </div>
      </Col>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/endstone.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.monuments}</h3>
            <small>{t("monuments")}</small>
          </div>
        </div>
      </Col>
      <Col lg={4} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/obsidian.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.cores}</h3>
            <small>{t("cores")}</small>
          </div>
        </div>
      </Col>
      <Col lg={6} xs={6} className="about-col">
        <div className="stats-container">
          <img src="/terracotta.png" alt="" className="block" />
          <div className="stats">
            <h3>{props.hills}</h3>
            <small>{t("hills")}</small>
          </div>
        </div>
      </Col>
      <Col lg={6} xs={6} className="about-col">
        <div className="stats-container">
          <img
            src="/flag.png"
            alt=""
            className="block"
            style={{ marginRight: "-15px" }}
          />
          <div className="stats">
            <h3>{props.flags}</h3>
            <small>{t("flags")}</small>
          </div>
        </div>
      </Col>
    </Row>
  );
}
