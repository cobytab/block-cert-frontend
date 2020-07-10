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
  colors,
} from "./shared";
const StyledInfo = styled.p`
  font-size: 1.2rem;
`;

const StyledCert = styled.div`
  border-radius: 1rem;
  border: 0.1rem solid ${colors.secondary};
  box-shadow: ;
  background-color: ${colors.light};
  padding: 1rem;
  padding-bottom: 1.5rem;
`;

const StyledDetail = styled.div`
  border-bottom: 0.1rem solid ${colors.primary};
  padding: 1.4rem;
`;

const CertTitle = styled.p`
  padding: 0.5rem;
  margin-top: 0.8rem;
  text-transform: uppercase;
  font-size: 2rem;
  color: ${colors.secondary};
`;

const CertHead = styled.p`
  font-size: 0.9rem;
  padding: 0.1rem;
  margin: 0rem;
  color: ${colors.secondary};
`;

const CertDetail = styled.p`
  font-size: 1.3rem;
  margin: 0rem;
  color: ${colors.tertiary};
`;

const Dashboard = ({ verifyData, appLoading, validity, validData }) => {
  const [serialNo, setSerialNo] = useState("");
  const [institution, setInstitution] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (serialNo === "" || institution === "" || fullName === "") {
      setMessage("Please fill in all fields!");
    } else if (!validateSerialNo(serialNo)) {
      setMessage("Please enter a valid index no!");
    } else if (!validateFullName(fullName)) {
      setMessage("Please enter a valid student full name!");
    } else if (!validateFullName(institution)) {
      setMessage("Please enter a valid institution name!");
    } else {
      verifyData(
        {
          serialNo: serialNo.trim(),
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

  const validateSerialNo = (serialNo) => {
    let re = /[0-9]+/;
    return re.test(serialNo);
  };

  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          {validity === "valid" ? (
            <Welcome>
              <StyledCert>
                <CertTitle color={colors.dark}>{validData.institution}</CertTitle>
                <StyledDetail>
                  <CertHead>Serial Number</CertHead>
                  <CertDetail>{validData.serialNo}</CertDetail>
                </StyledDetail>
                <StyledDetail>
                  <CertHead>Name</CertHead>
                  <CertDetail>{validData.fullName}</CertDetail>
                </StyledDetail>
                <StyledDetail>
                  <CertHead>Degree</CertHead>
                  <CertDetail>
                    {validData.degree}
                  </CertDetail>
                </StyledDetail>
              </StyledCert>
            </Welcome>
          ) : (
            <Welcome>
              <PortalImage image={portalImg} />
              <StyledHead> Welcome to the Block-Cert portal.</StyledHead>
              <StyledInfo>
                Enter the details of the certificate you want to verify.
              </StyledInfo>
            </Welcome>
          )}
        </Col>
        <Col md="6">
          <Welcome>
            {!validity && (
              <form>
                <StyledInputField>
                  <Label>Certificate Serial Number</Label>
                  <StyledInput
                    onChange={(value) => setSerialNo(value.target.value)}
                    type="text"
                    name="serialNo"
                    placeholder="e.g. 1234000"
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
                    placeholder="e.g. firstname lastname"
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
                    <option>University Of Ghana</option>
                    <option>University Of Cape Coast</option>
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
  validData: user.validData
});

export default connect(mapStateToProps, { verifyData })(Dashboard);
