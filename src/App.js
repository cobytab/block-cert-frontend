import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

// Custom routes
import AuthRoute from "./components/AuthRoute";
import BasicRoute from "./components/BasicRoute";

import { connect } from "react-redux";

import { Switch, Route } from "react-router-dom";

function App({ checked }) {
  return (
    <div className="App">
      {checked && (
        <>
          <NavBar />
          <Switch>
            <BasicRoute path="/login">
              <Login />
            </BasicRoute>
            <BasicRoute path="/signup">
              <Signup />
            </BasicRoute>
            <AuthRoute path="/dashboard">
              <Dashboard />
            </AuthRoute>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
});

export default connect(mapStateToProps, {})(App);
