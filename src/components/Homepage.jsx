import React from "react";

// React strap
import { Container, Row, Col, Button } from "reactstrap";

import styled from "styled-components";

// Custom imports
import { colors } from "./shared";
import welcomeImg from "./../assets/welcomeImg.jpg";
import stage1 from "./../assets/stage1.png";
import stage2 from "./../assets/stage2.png";
import stage3 from "./../assets/stage3.png";
import stage4 from "./../assets/stage4.png";

import { Link } from "react-router-dom";

const StyledContainer = styled(Container)`
  background-color: ${colors.primary};
  border-radius: 0.5rem;
`;

const Welcome = styled.p`
  font-size: 2.3rem;
  justify-content: center;
  height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const WelcomeImage = styled.div`
  background-image: url(${welcomeImg});
  height: calc(100vh - 85px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const StyledButton = styled(Link)`
  width: 16rem;
  padding: 0.3rem;
  border: 0.1rem solid ${colors.secondary};
  border-radius: 0.5rem;
  color: ${colors.secondary};
  font-size: 1.7rem;
  align-self: center;
  margin-top: 2rem;

  &:hover {
    background-color: ${colors.secondary};
    text-decoration: none;
    color: ${colors.primary};
  }
`;

const StyledCol = styled(Col)`
  padding: 1rem;
`;

const StyledImage = styled.img`
  margin: 1rem;
  width: 60%;
  transition: all 0.1s ease-out;

  &:hover {
      margin: 0rem;
      width: 65%;
  }
`;

const StyledDiv = styled.div`
  background-color: ${colors.light};
  margin: 0px -15px;
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
            <StyledButton to="/start">Get Started</StyledButton>
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
