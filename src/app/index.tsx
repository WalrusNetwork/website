import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RedirectXT from "../components/redirectxt";
import * as serviceWorker from "../serviceWorker";
import "../index.scss";

// Import Scroll to Top
import Scroll from "../components/scroll";

// Pages and other components
import Auth from "./auth";
import Navigation from "../components/navigation";
import Homepage from "../pages/homepage";
import Guides from "../pages/guides";
import Blog from "../pages/blog";
import Admin from "../pages/admin";
import Staff from "../pages/staff";
import Other from "../pages/other";
import User from "../pages/user";
import NotFound from "../pages/notfound";
import Footer from "../components/footer";

// Import Private Routes Component
import { AdminRoute } from "./private";

// Localization
import "./i18n.tsx";

// Icons
import "./icons.tsx";

// GraphQL
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import Config from "./config.json";

const httpLink = () =>
  createHttpLink({
    uri: Config.API_URL,
    credentials: "include",
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, httpLink()]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  queryDeduplication: true,
});

/////////////

const app = (
  <Router>
    <Auth>
      <ApolloProvider client={client}>
        <Navigation />
        <Scroll />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/guides" component={Guides} />
          <Route exact path="/guides/:url*" component={Guides} />
          <Route exact path="/blog/:url" component={Blog} />
          <Route exact path="/staff" component={Staff} />
          {/* <NoAuthRoute exact path="/register" component={Register} /> */}
          <AdminRoute exact path="/admin" component={Admin} />
          <Route
            exact
            path="/tos"
            render={props => (
              <Other {...props} page="tos" title="Terms of Service" />
            )}
          />
          <Route
            exact
            path="/privacy"
            render={props => (
              <Other {...props} page="privacy" title="Privacy Policy" />
            )}
          />
          <Route
            exact
            path="/cookies"
            render={props => (
              <Other {...props} page="cookies" title="Cookie Policy" />
            )}
          />
          <Route
            exact
            path="/jobs"
            render={props => (
              <Other {...props} page="jobs" title="Job Postings" />
            )}
          />
          <Route
            exact
            path="/rules"
            render={props => (
              <Other {...props} page="rules" title="Player Rules" />
            )}
          />
          <Route
            exact
            path="/punishments"
            render={props => (
              <Other {...props} page="punishments" title="Punishments" />
            )}
          />
          <Route
            path="/shop"
            component={() => <RedirectXT to="https://walrus.buycraft.net/" />}
          />
          <Route
            path="/discord"
            component={() => <RedirectXT to="https://discord.gg/eySJYEb" />}
          />
          <Route exact path="/:url" component={User} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </ApolloProvider>
    </Auth>
  </Router>
);

ReactDOM.render(app, document.getElementById("website"));

serviceWorker.unregister();
