import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { resetValidity } from './../app/actions/userActions';

// React icons
import {
  IoMdCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosSearch,
} from "react-icons/io";

// Styled components
import { StyledButton, colors } from "./shared";

const StyledResultIcon = styled.p`
  font-size: 12rem;
  color: ${(props) => props.color};
  animation: 10s spin linear infinite;

  @keyframes spin {
    from {
      transform: rotate (0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledMessage = styled.p`
  font-size: 1.8rem;
  color: ${(props) => props.color};
`;

const SmallStyledBtn = styled(StyledButton)`
  display: inline-block;
  font-size: 1.4rem;

  svg {
    margin-bottom: 0.1rem;
    font-size: 1.6rem;
  }
`;

const DashboardResult = ({ validity, resetValidity }) => {
  return (
    <div>
      {validity === "valid" && (
        <>
          <StyledResultIcon color={colors.green}>
            <IoMdCheckmarkCircleOutline />
          </StyledResultIcon>
          <StyledMessage color={colors.green}>
            The supplied certificate is valid and exists in our system!
          </StyledMessage>
        </>
      )}

      {validity === "invalid" && (
        <>
          <StyledResultIcon color={colors.alternate}>
            <IoIosCloseCircleOutline />
          </StyledResultIcon>
          <StyledMessage color={colors.alternate}>
            The supplied certificate is invalid and does not exist in our
            system!
          </StyledMessage>
        </>
      )}

      <SmallStyledBtn to="/dashboard" onClick={resetValidity}>
        Search Again <IoIosSearch />
      </SmallStyledBtn>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  validity: user.validity,
});

export default connect(mapStateToProps, {resetValidity})(DashboardResult);
