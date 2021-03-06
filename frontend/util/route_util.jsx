import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Route } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/stream" />
    }
  />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mStP = state => {
  return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(
  connect(mStP, null)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mStP, null)(Protected)
);