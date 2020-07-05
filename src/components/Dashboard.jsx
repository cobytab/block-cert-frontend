import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// Reactstrap
import { Row, Col, Spinner } from "reactstrap";

// React icons
import { FiUser } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { TiBusinessCard } from "react-icons/ti";

// Styled components
import {
  StyledContainer,
  Welcome,
  colors,
  StyledInputField,
  StyledSelect,
  Label,
  StyledSubmit,
  StyledIcon,
  InfoIcon,
  StyledInput,
  Message,
} from "./shared";
import { connect } from "react-redux";
import { loginUser, verifyData } from "./../app/actions/userActions";

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

export const StyledSpinner = styled(Spinner)`
  margin-left: 1rem;
`;

export const StyledSubmitLoading = styled.button`
  border-radius: 1rem;
  height: 3.5rem;
  font-size: 1.2rem;
  margin: 1rem auto;
  width: 80%;
  border: 0.1rem solid ${colors.secondary};
  transition: all 0.3s ease-out;
  background-color: ${colors.secondary};
  text-decoration: none;
  color: ${colors.primary};
  opacity: 0.7;
`;

const Dashboard = ({ loginUser, verifyData, appLoading }) => {
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
      verifyData(
        {
          indexNo: indexNo.trim(),
          institution: institution.trim(),
          fullName: fullName.trim(),
        },
        history
      );
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
                  <TiBusinessCard />
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
                <StyledSelect
                  name="institution"
                  onChange={(value) => setInstitution(value.target.value)}
                >
                  <option></option>
                  <option>University of Ghana</option>
                  <option>University of Cape Coast</option>
                </StyledSelect>

                <StyledIcon postion="left">
                  <IoMdSchool />
                </StyledIcon>
              </StyledInputField>

              {message && <Message>{message}</Message>}
              {!appLoading && (
                <StyledSubmit type="submit" onClick={(e) => handleSubmit(e)}>
                  Verify
                </StyledSubmit>
              )}

              {appLoading && (
                <StyledSubmitLoading disabled type="submit">
                  Verifying...
                  <StyledSpinner
                    style={{ width: "1.6rem", height: "1.6rem" }}
                    type="grow"
                  />
                </StyledSubmitLoading>
              )}
            </form>
          </Welcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  appLoading: user.appLoading,
});

export default connect(mapStateToProps, { loginUser, verifyData })(Dashboard);
