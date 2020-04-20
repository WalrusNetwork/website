import React from "react";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export default function Sidebar() {
  const { t } = useTranslation("homepage");

  return (
    <div className="d-flex flex-column">
      <ButtonGroup vertical size="lg" className="homepage-sidebar">
        <Button
          variant="outline-primary"
          style={{ pointerEvents: "none" }}
          className="font-weight-bold"
        >
          {t("Join us")}:
        </Button>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-disabled" style={{ textAlign: "center" }}>
              {t("Click to copy")}
            </Tooltip>
          }
        >
          <Button
            variant="success"
            onClick={() => {
              navigator.clipboard.writeText("walrus.gg");
            }}
          >
            <FontAwesomeIcon icon="cube" />
            <span>walrus.gg</span>
          </Button>
        </OverlayTrigger>
        <Button variant="primary" href="https://discord.gg/eySJYEb">
          <FontAwesomeIcon icon={["fab", "discord"]} />
          discord.gg/eySJYEb
        </Button>
      </ButtonGroup>

      <ButtonGroup vertical size="lg" className="homepage-sidebar ">
        <Button
          variant="outline-primary"
          style={{ pointerEvents: "none" }}
          className="font-weight-bold"
        >
          {t("Follow us")}:
        </Button>
        <Button variant="info" href="https://twitter.com/walrus_gg">
          <FontAwesomeIcon icon={["fab", "twitter"]} />
          <span>@walrus_gg</span>
        </Button>
        <Button variant="primary" href="https://instagram.com/walrus_gg">
          <FontAwesomeIcon icon={["fab", "instagram"]} />
          <span>@walrus_gg</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}
