import React from "react";

import Container from "react-bootstrap/Container";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default function RedirectXT(props: any) {
  window.location = props.to;
  const { t } = useTranslation("commons");

  return (
    <Container style={{ marginBottom: 30, minHeight: "60vh" }}>
      <h2 className="redirect">{t("Redirecting...")}</h2>
    </Container>
  );
}
