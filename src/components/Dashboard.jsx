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
  StyledInput,
  Message,
} from "./shared";
import { connect } from "react-redux";
import { loginUser } from "./../app/actions/userActions";

import portalImg from "./../assets/portalfront.jpg";

const PortalImage = styled.div`
  background-image: url(${portalImg});
  height: calc(100vh - 85px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const StyledInfo = styled.p`
  font-size: 1.2rem;
`;

export const StyledHead = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  color: ${colors.secondary};
`;

const Dashboard = ({ loginUser }) => {
  const [indexNo, setIndexNo] = useState("");
  const [institution, setInstitution] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (indexNo === "" || institution === "" || fullName === "") {
      setMessage("Please fill in all fields!");
    } else if (!validateIndexNo(indexNo)) {
      setMessage("Please enter a valid index no!");
    } else if (!validateFullName(fullName)) {
      setMessage("Please enter a valid student full name!");
    } else if (!validateFullName(institution)) {
      setMessage("Please enter a valid institution name!");
    } else {
      // Go to server.
      // verifyData(
      //   {
      //     indexNo: indexNo.trim(),
      //     institution: institution.trim(),
      //     fullName: fullName.trim(),
      //   },
      //   history
      // );
    }

    e.preventDefault();
    setTimeout(() => setMessage(""), 3000);
  };

  const validateFullName = (indexNo) => {
    let re = /^[A-Za-z ]*$/;
    return re.test(indexNo);
  };

  const validateIndexNo = (indexNo) => {
    let re = /[0-9]+/;
    return re.test(indexNo);
  };

  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          <Welcome>
            <PortalImage />
            <StyledHead> Welcome to the Block-Cert portal.</StyledHead>
            <StyledInfo>
              Enter the details of the certificate you want to verify.
            </StyledInfo>
          </Welcome>
        </Col>
        <Col md="6">
          <Welcome>
            <form>
              <StyledInputField>
                <Label>Student Index Number</Label>
                <StyledInput
                  onChange={(value) => setIndexNo(value.target.value)}
                  type="text"
                  name="indexNo"
                />
                <StyledIcon postion="left">
                  <FiUser />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Student Full Name</Label>
                <StyledInput
                  onChange={(value) => setFullName(value.target.value)}
                  type="text"
                  name="fullName"
                />
                <StyledIcon postion="left">
                  <FiUser />
                </StyledIcon>
              </StyledInputField>
              <StyledInputField>
                <Label>Institution Name</Label>
                <StyledInput
                  onChange={(value) => setInstitution(value.target.value)}
                  type="text"
                  name="institution"
                />
                <StyledIcon postion="left">
                  <FiUser />
                </StyledIcon>
              </StyledInputField>

              {message && <Message>{message}</Message>}
              <StyledSubmit type="submit" onClick={(e) => handleSubmit(e)}>
                Verify
              </StyledSubmit>
            </form>
          </Welcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default connect(null, { loginUser })(Dashboard);
