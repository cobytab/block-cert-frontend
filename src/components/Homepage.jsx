import React from "react";

// React strap
import { Row, Col } from "reactstrap";

import styled from "styled-components";

// Custom imports
import { colors, StyledContainer, Welcome, StyledButton } from "./shared";
import welcomeImg from "./../assets/welcomeImg.jpg";
import stage1 from "./../assets/stage1.png";
import stage2 from "./../assets/stage2.png";
import stage3 from "./../assets/stage3.png";
import stage4 from "./../assets/stage4.png";

const WelcomeImage = styled.div`
  background-image: url(${welcomeImg});
  height: calc(100vh - 85px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const StyledCol = styled(Col)`
  padding: 1rem;
`;

const StyledImage = styled.img`
  margin: 1rem;
  width: 60%;
  transition: all 0.3s ease-out;

  &:hover {
    margin: 0rem;
    width: 65%;
  }
`;

const StyledDiv = styled.div`
  background-color: ${colors.light};
  margin: 0px -15px;
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  padding: 1.5rem;
  padding-top: 2.5rem;
  color: ${colors.tertiary};
`;

const ImgTitle = styled(SectionTitle)`
  font-size: 1.4rem;
  font-weight: 300;
`;

const ImgDesc = styled.p`
  font-size: 1rem;
`;

const ImageDetails = ({ image, title, details }) => {
  return (
    <StyledCol md="3">
      <StyledImage src={image} />
      <ImgTitle>{title}</ImgTitle>
      <ImgDesc>{details}</ImgDesc>
    </StyledCol>
  );
};

const Homepage = () => {
  return (
    <StyledContainer>
      <Row>
        <Col md="6">
          <Welcome>
            We provide you with an efficient and secured way of storing and
            validating college certificates.
            <StyledButton to="/login">Get Started</StyledButton>
          </Welcome>
        </Col>
        <Col md="6">
          <WelcomeImage />
        </Col>
      </Row>

      <StyledDiv>
        <SectionTitle>How Block-Cert Works</SectionTitle>

        <Row>
          <ImageDetails
            image={stage1}
            title="Scan and Store"
            details="The details of the certificates are scanned and stored in a
              secured database."
          />

          <ImageDetails
            image={stage2}
            title="Details Hashing"
            details="The relevant details on the certificate are hashed which ensures
              that it's tamper-proof."
          />

          <ImageDetails
            image={stage3}
            title="Blockchain Storage"
            details="A decentralized blockchain network is used to store the hashed
              data for added security."
          />

          <ImageDetails
            image={stage4}
            title="Verification"
            details="A verification key is generated which enables institutions to
              verify available certificates."
          />
        </Row>
      </StyledDiv>
    </StyledContainer>
  );
};

export default Homepage;
