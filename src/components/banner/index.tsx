import React from "react";
import { useTranslation } from "react-i18next";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import TextLoop from "react-text-loop";
import "./styles.css";
import { style } from "./random";

export default function Banner() {
  const { t } = useTranslation("homepage");

  return (
    <Jumbotron fluid className="banner" style={style}>
      <Container className="container-banner">
        <h1>Walrus Network</h1>
        <p>
          {t("We are a Minecraft")}{" "}
          <TextLoop>
            <span>{t("server")}</span>
            <span>{t("network")}</span>
            <span>{t("community")}</span>
          </TextLoop>
          . {t("You decide what's next")}.
        </p>
      </Container>
    </Jumbotron>
  );
}
