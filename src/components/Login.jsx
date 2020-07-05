import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// Reactstrap
import { Row, Col } from "reactstrap";

// React icons
import { FiUser, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";

// Styled components
import {
  StyledContainer,
  Welcome,
  colors,
  StyledInputField,
  Label,
  StyledSubmit,
  StyledIcon,
  InfoIcon,
  StyledInfo,
  StyledInput,
  Message,
} from "./shared";
import { connect } from "react-redux";
import { loginUser } from "./../app/actions/userActions";

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    if (email === "" || password === "") {
      setMessage("Please fill in all fields!");
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email");
    } else {
      // Go to server.
      loginUser({ email: email.trim(), password: password.trim() }, history);
    }

    e.preventDefault();
    setTimeout(() => setMessage(""), 3000);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          <Welcome>
            <InfoIcon>
              <FiLogIn />
            </InfoIcon>
            <StyledInfo>
              Login to your account to access the college certificate
              verification portal.
            </StyledInfo>
          </Welcome>
        </Col>
        <Col md="6">
          <Welcome>
            <form>
              <StyledInputField>
                <Label>Email</Label>
                <StyledInput
                  onChange={(value) => setEmail(value.target.value)}
                  type="text"
                  name="email"
                />
                <StyledIcon postion="left">
                  <FiUser />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Password</Label>
                <StyledInput
                  onChange={(value) => setPassword(value.target.value)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <StyledIcon postion="left">
                  <FiLock />
                </StyledIcon>
                <StyledIcon
                  onClick={() => setShowPassword(!showPassword)}
                  postion="right"
                >
                  {showPassword && <FiEye />}
                  {!showPassword && <FiEyeOff />}
                </StyledIcon>
              </StyledInputField>
              {message && <Message>{message}</Message>}
              <StyledSubmit type="submit" onClick={(e) => handleSubmit(e)}>
                Proceed
              </StyledSubmit>
            </form>
          </Welcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default connect(null, { loginUser })(Login);
