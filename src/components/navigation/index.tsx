import React, { useState, useContext } from "react";
import { AuthContext } from "../../app/auth";

import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, AlertContainer } from "react-bs-notifier";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Login from "./login";
import "./styles.css";

export default function Navigation() {
  const [showAlert, setShowAlert] = useState(false);
  const { t, i18n } = useTranslation("commons");

  const { state: authState, dispatch } = useContext(AuthContext);

  const LOGOUT = gql`
    mutation {
      invalidateTokens
    }
  `;

  const [logout, { loading }] = useMutation(LOGOUT, {
    optimisticResponse() {
      dispatch({
        type: "LOGOUT",
      });
    },

    onError() {
      setShowAlert(true);
    },
  });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img
              alt=""
              src="/nav_logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" Walrus "}
          </NavLink>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="mr-auto">
              <NavLink
                to="/play"
                className="nav-link disabled"
                activeClassName="active"
              >
                <FontAwesomeIcon icon="play" /> {t("Play")}
              </NavLink>
              <NavLink
                to="/guides"
                className="nav-link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon="book-open" /> {t("Guides")}
              </NavLink>
              <NavLink to="/shop" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon="shopping-basket" /> {t("Shop")}
              </NavLink>
              <NavLink
                to="/leaderboards"
                className="nav-link disabled"
                activeClassName="active"
              >
                <FontAwesomeIcon icon="list-ul" /> {t("Leaderboards")}
              </NavLink>
              <NavLink
                to="/uhc"
                className="nav-link disabled"
                activeClassName="active"
              >
                <FontAwesomeIcon icon="heartbeat" /> UHC
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <img
                    src={"/flags/" + t("locale") + ".png"}
                    className="flag-icon"
                    alt="Language"
                  />
                }
                className="language-dropdown"
                id="language-dropdown"
              >
                <NavDropdown.Item onClick={() => changeLanguage("en-US")}>
                  English (US)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage("es-ES")}>
                  Español
                </NavDropdown.Item>
              </NavDropdown>
              {!authState.isAuthenticated ? (
                <NavDropdown
                  title={<FontAwesomeIcon icon="user" />}
                  id="user-dropdown"
                >
                  <Login />
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={
                    <img
                      src={
                        "https://cravatar.eu/helmavatar/" +
                        authState.user.uuid +
                        "/20"
                      }
                      alt={authState.user.username}
                    />
                  }
                  id="user-dropdown"
                >
                  <LinkContainer to={"/" + authState.user.username}>
                    <NavDropdown.Item>{t("Profile")}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {authState.isAdmin && (
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>Admin Panel</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={() => logout({})}>
                    {!loading ? t("Log Out") : t("Logging Out...")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <AlertContainer position="bottom-right">
        {showAlert ? (
          <Alert
            type="danger"
            headline="Error! :("
            onDismiss={() => setShowAlert(false)}
            timeout={1500}
          >
            {t("Something wrong happened. Please try again")}
          </Alert>
        ) : null}
      </AlertContainer>
    </>
  );
}
