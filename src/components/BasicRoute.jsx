import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const BasicRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export default connect(mapStateToProps, {})(BasicRoute);
