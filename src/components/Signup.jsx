import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Styled Components
import styled from "styled-components";
import {
  StyledContainer,
  Welcome,
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
  FiMail,
  FiLock,
  FiPhone,
  FiUserPlus,
  FiEye,
  FiEyeOff,
  FiKey,
} from "react-icons/fi";

// Redux
import { connect } from "react-redux";
import { signupUser } from "./../app/actions/userActions";

const MinWelcome = styled.div`
  min-height: calc(100vh - 85px) !important;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 2.3rem;
`;

const Signup = ({ signupUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    if (
      email === "" ||
      password === "" ||
      rePassword === "" ||
      fullName === "" ||
      phoneNumber === ""
    ) {
      setMessage("Please fill in all fields!");
    } else if (!validateFullName(fullName)) {
      setMessage("Please enter a valid full name!");
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email!");
    } else if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Please enter a valid phone number!");
    } else if (!validatePassword(password)) {
      setMessage("Password should contain numbers!");
    } else if (password !== rePassword) {
      setMessage("Passwords donot match!");
    } else {
      // Go to server.
      signupUser(
        {
          email: email.trim(),
          password: password.trim(),
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
        },
        history
      );
    }

    e.preventDefault();
    setTimeout(() => setMessage(""), 3000);
  };

  const validateFullName = (fullName) => {
    let re = /^[A-Za-z ]*$/;
    return re.test(fullName);
  };

  const validatePassword = (password) => {
    let re = /[0-9]+/;
    return re.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    let re = /^(233|0)[\d]{9}$/;
    return re.test(phoneNumber);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          <MinWelcome>
            <InfoIcon>
              <FiUserPlus />
            </InfoIcon>
            <StyledInfo>
              Create a Block-Cert account to access the college certificate
              verification portal.
            </StyledInfo>
          </MinWelcome>
        </Col>
        <Col md="6">
          <MinWelcome>
            <form>
              <StyledInputField>
                <Label>Full Name</Label>
                <StyledInput
                  onChange={(value) => setFullName(value.target.value)}
                  type="text"
                  name="firstName"
                  placeholder="e.g. firstname lastname"
                />
                <StyledIcon postion="left">
                  <FiUser />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Email</Label>
                <StyledInput
                  onChange={(value) => setEmail(value.target.value)}
                  type="text"
                  name="email"
                  placeholder="e.g. user@example.com"
                />
                <StyledIcon postion="left">
                  <FiMail />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Phone Number</Label>
                <StyledInput
                  onChange={(value) => setPhoneNumber(value.target.value)}
                  type="text"
                  name="phoneNumber"
                  placeholder="e.g. (233)55500000"
                />
                <StyledIcon postion="left">
                  <FiPhone />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Password</Label>
                <StyledInput
                  onChange={(value) => setPassword(value.target.value)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="* * * * * * * *"
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
                  placeholder="* * * * * * * *"
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
          </MinWelcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default connect(null, { signupUser })(Signup);
