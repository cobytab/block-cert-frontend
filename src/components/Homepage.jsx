import React from "react";

// React strap
import { Container, Row, Col, Button } from "reactstrap";

import styled from "styled-components";
import { colors } from "./shared";
import welcomeImg from "./../assets/welcomeImg.jpg";

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

const Homepage = () => {
  return (
    <div>
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
      </StyledContainer>
    </div>
  );
};

export default Homepage;
