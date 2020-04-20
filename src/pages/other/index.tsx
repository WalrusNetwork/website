import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import Spinner from "react-bootstrap/Spinner";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

export default function Other(props: any) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (t("locale") !== "locale") {
      fetch(`other/${props.page}/${t("locale")}.md`).then(response => {
        if (!response.ok) {
          setInput(
            `# :(\n${t("Seems this document hasn't been translated yet...")}`
          );
          setLoading(false);
        } else {
          response.text().then(text => {
            if (text.startsWith("<")) {
              setInput(
                `# :(\n${t(
                  "Seems this document hasn't been translated yet..."
                )}`
              );
              setLoading(false);
            } else {
              setInput(text);
              setLoading(false);
            }
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [t("locale"), props.page]);

  function flatten(text: any, child: any) {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  }

  function Heading(props: any) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[!@#$%^&*?'":.]/g, "");
    return React.createElement("h" + props.level, { id: slug }, props.children);
  }

  function Image(props: any) {
    return <img {...props} style={{ maxWidth: "40%" }} alt="" />;
  }

  function Blockquote(props: any) {
    return React.createElement(
      "blockquote",
      { style: { marginLeft: "40px" } },
      props.children
    );
  }

  return (
    <div style={{ minHeight: "67vh" }}>
      <Helmet>
        <title>Walrus Network - {t(props.title)}</title>
      </Helmet>
      <CSSTransition in={!loading} timeout={200} classNames="guide-appearing">
        <Container
          className="other"
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          {loading ? (
            <Spinner className="spinner" animation="border" variant="primary" />
          ) : (
            <ReactMarkdown
              source={input}
              escapeHtml={false}
              renderers={{
                heading: Heading,
                blockquote: Blockquote,
                image: Image,
              }}
            />
          )}
        </Container>
      </CSSTransition>
    </div>
  );
}
