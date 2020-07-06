import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Reactstrap
import { Row, Col } from "reactstrap";

// React icons
import { FiUser } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { TiBusinessCard } from "react-icons/ti";

// redux
import { connect } from "react-redux";
import { verifyData } from "./../app/actions/userActions";

// components
import portalImg from "./../assets/portalfront.jpg";
import DashboardResult from "./DashboardResult";

// Styled components
import styled from "styled-components";
import {
  StyledContainer,
  Welcome,
  StyledInputField,
  StyledSelect,
  Label,
  StyledSubmit,
  StyledIcon,
  StyledInput,
  Message,
  PortalImage,
  StyledHead,
  StyledSubmitLoading,
  StyledSpinner,
} from "./shared";
const StyledInfo = styled.p`
  font-size: 1.2rem;
`;

const Dashboard = ({ verifyData, appLoading, validity }) => {
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

  const validateFullName = (fullName) => {
    let re = /^[A-Za-z ]*$/;
    return re.test(fullName);
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
            <PortalImage image={portalImg} />
            <StyledHead> Welcome to the Block-Cert portal.</StyledHead>
            <StyledInfo>
              Enter the details of the certificate you want to verify.
            </StyledInfo>
          </Welcome>
        </Col>
        <Col md="6">
          <Welcome>
            {!validity && (
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
            )}

            {validity && <DashboardResult />}
          </Welcome>
        </Col>
      </Row>
    </StyledContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  appLoading: user.appLoading,
  validity: user.validity,
});

export default connect(mapStateToProps, { verifyData })(Dashboard);
