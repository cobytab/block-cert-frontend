import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

// Styled Components
import styled from "styled-components";
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

// Reactstrap
import { Row, Col } from "reactstrap";

// React icons
import {
  FiUser,
  FiLock,
  FiUserPlus,
  FiEye,
  FiEyeOff,
  FiKey,
} from "react-icons/fi";

// Redux
import { connect } from 'react-redux'
import { signupUser } from './../app/actions/userActions';

const Signup = ({signupUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    if (email === "" || password === "" || rePassword === "") {
      setMessage("Please fill in all fields!");
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email!");
    } else if (!validatePassword(password)) {
      setMessage("Password should contain numbers!");
    } else if (password !== rePassword) {
      setMessage("Passwords donot match!");
    } else {
      // Go to server.
       signupUser({ email: email.trim(), password: password.trim() }, history);
    }

    e.preventDefault();
    setTimeout(() => setMessage(""), 3000);
  };

  const validatePassword = (password) => {
    let re = /[0-9]+/;
    return re.test(password);
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
              <FiUserPlus />
            </InfoIcon>
            <StyledInfo>
              Create a Block-Cert account to access the college certificate
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
              <StyledInputField>
                <Label>Repeat Password</Label>
                <StyledInput
                  onChange={(value) => setRePassword(value.target.value)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <StyledIcon postion="left">
                  <FiKey />
                </StyledIcon>
              </StyledInputField>
              {message && <Message>{message}</Message>}
              <StyledSubmit type="submit" onClick={(e) => handleSubmit(e)}>
                Register
              </StyledSubmit>
            </form>
          </Welcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default connect(null, {signupUser})(Signup);
