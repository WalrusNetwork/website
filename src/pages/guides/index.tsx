import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Title from "../../components/title";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

import ReactMarkdown from "react-markdown";
import { CSSTransition } from "react-transition-group";

export default function Guides() {
  const { t } = useTranslation(["commons", "guides"]);
  const [guides, setGuides] = useState([]);
  const [guide, setGuide] = useState("");
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(true);
  let { url } = useParams();
  let locale = t("locale");

  useEffect(() => {
    fetch("/guides.json")
      .then(res => res.json())
      .then(data => {
        setGuides(data);
        if (url !== undefined) {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].guides.length; j++) {
              if (data[i].guides[j].url === url) {
                setGuide(data[i].guides[j].full);
              }
            }
          }
        }
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    if (locale !== "locale" && url === undefined) {
      fetch(`/guides/${locale}.md`)
        .then(response => response.text())
        .then(text => {
          setInput(text);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [locale]);

  useEffect(() => {
    setLoading(true);
    if (locale !== "locale" && guide) {
      fetch(`/guides/${guide.replace(/\?/g, "%3F")}/${locale}.md`).then(
        response => {
          if (!response.ok) {
            setInput(
              `# :(\n${t(
                "guides:Seems like your guide hasn't been translated yet..."
              )}`
            );
            setLoading(false);
          } else {
            response.text().then(text => {
              if (text.startsWith("<")) {
                setInput(
                  `# :(\n${t(
                    "guides:Seems like your guide hasn't been translated yet..."
                  )}`
                );
                setLoading(false);
              } else {
                setInput(text);
                setLoading(false);
              }
            });
          }
        }
      );
    }
    // eslint-disable-next-line
  }, [locale, guide]);

  function flatten(text: any, child: any) {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  }

  function Heading(props: any) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[!@#$%^&*?'":.]/g, "");
    if (props.level !== 1) {
      return React.createElement(
        "h" + props.level,
        { id: slug },
        props.children
      );
    } else {
      return (
        <h1 id={slug}>
          {props.children}{" "}
          <a href={window.location.href}>
            <FontAwesomeIcon icon="link" />
          </a>
        </h1>
      );
    }
  }

  function Image(props: any) {
    return <img {...props} style={{ maxWidth: "40%" }} alt="" />;
  }

  function Section(props: { children: any; eventKey: string }) {
    const decoratedOnClick = useAccordionToggle(props.eventKey, () =>
      console.log("Section clicked")
    );

    return (
      <Button
        variant="outline-primary"
        className="font-weight-bold tab-button"
        onClick={decoratedOnClick}
      >
        {props.children}
      </Button>
    );
  }

  return (
    <div style={{ minHeight: "70vh" }}>
      <Helmet>
        <title>Walrus Network - {t("Guides")}</title>
      </Helmet>
      <Title
        title={t("Guides")}
        subtitle={t("guides:Information you might be interested in!")}
      />
      <Col lg={12}>
        <Row>
          <Col lg={2} md={12}>
            <div className="d-flex flex-column sidebar">
              <Accordion defaultActiveKey="FAQs">
                {guides.map((section: any) => (
                  <div className="d-flex flex-column">
                    <Section eventKey={section.section}>
                      {t("sections:" + section.section)}
                    </Section>
                    <Accordion.Collapse eventKey={section.section}>
                      <Nav
                        className="flex-column"
                        style={{ marginTop: "10px" }}
                      >
                        {section.guides.map((guideTitle: any) => (
                          <Nav.Item>
                            <Nav.Link
                              onClick={() => {
                                setGuide(guideTitle.full);
                                window.history.pushState(
                                  { guide: guideTitle.url },
                                  "Walrus Network",
                                  `/guides/${guideTitle.url}`
                                );
                              }}
                              className={
                                guide === guideTitle.full
                                  ? "guide active"
                                  : "guide"
                              }
                            >
                              {t("guides:" + guideTitle.name)}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </div>
          </Col>
          <Col lg={8}>
            <CSSTransition
              in={!loading}
              timeout={200}
              classNames="guide-appearing"
            >
              <Card className="guides">
                <Card.Body>
                  {loading ? (
                    <Spinner
                      className="spinner"
                      animation="border"
                      variant="primary"
                    />
                  ) : (
                    <ReactMarkdown
                      source={input}
                      escapeHtml={false}
                      renderers={{ heading: Heading, image: Image }}
                    />
                  )}
                </Card.Body>
              </Card>
            </CSSTransition>
          </Col>
          <Col lg="2">
            <div className="d-flex flex-column toc">
              {input && (
                <CSSTransition
                  in={!loading}
                  timeout={200}
                  classNames="guide-appearing"
                >
                  <div>
                    <h5 className="content-header">{t("guides:Content")}</h5>
                    <ReactMarkdown
                      source={input}
                      renderers={{
                        root: ({ children }) => {
                          const TOCLines = children.reduce(
                            (
                              acc: any,
                              { key, props }: { key: any; props: any }
                            ) => {
                              // Skip non-headings
                              if (key.indexOf("heading") !== 0) {
                                return acc;
                              }

                              // Indent by two spaces per heading level after h1
                              let indent = "";
                              for (let idx = 1; idx < props.level; idx++) {
                                indent = `${indent}  `;
                              }

                              // Append line to TOC
                              // This is where you'd add a link using Markdown syntax if you wanted
                              if (
                                props.children[0].props.children[0].props !==
                                undefined
                              ) {
                                return acc.concat([
                                  `${indent}* [${
                                    props.children[0].props.children[0].props
                                      .children
                                  }](#${props.children[0].props.children[0].props.children
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/[!@#$%^&*?'"]/g, "")})`,
                                ]);
                              } else if (
                                props.children[0].props !== undefined
                              ) {
                                return acc.concat([
                                  `${indent}* [${
                                    props.children[0].props.children
                                  }](#${props.children[0].props.children
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/[!@#$%^&*?'"]/g, "")})`,
                                ]);
                              } else {
                                return acc.concat([`* Error`]);
                              }
                            },
                            []
                          );

                          return <ReactMarkdown source={TOCLines.join("\n")} />;
                        },
                      }}
                    />
                  </div>
                </CSSTransition>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
