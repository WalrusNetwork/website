import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./styles.css";
import { style } from "../banner/random";

export default function Title(props: any) {
  return (
    <Jumbotron fluid className="site-title" style={style}>
      <Container className="container-title">
        <h2>{props.title}</h2>
        {props.subtitle && <p>{props.subtitle}</p>}
      </Container>
    </Jumbotron>
  );
}
