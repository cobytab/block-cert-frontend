import React from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Dashboard from './components/Dashboard';
import AuthRoute from './components/AuthRoute';

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
