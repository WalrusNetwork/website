import React, { useContext } from "react";
import { Route } from "react-router-dom";

import Forbidden from "../pages/forbidden";
import { AuthContext } from "./auth";

export const NoAuthRoute = ({ component: Component, ...rest }: any) => {
  let { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props: any) =>
        !state.isAuthenticated ? <Component {...props} /> : <Forbidden />
      }
    />
  );
};

export const AuthRoute = ({ component: Component, ...rest }: any) => {
  let { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props: any) =>
        state.isAuthenticated ? <Component {...props} /> : <Forbidden />
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }: any) => {
  let { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props: any) =>
        state.isAdmin ? <Component {...props} /> : <Forbidden />
      }
    />
  );
};
