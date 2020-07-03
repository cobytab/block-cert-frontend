import React, { useState } from "react";

import styled from "styled-components";

// Reactstrap
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";

// React router
import { NavLink } from "react-router-dom";

import { colors } from './shared';

const StyledNavLink = styled(NavLink)`
  margin-left: 1rem;
  display: inline-block;
  min-width: 8rem;
  padding: 0.3rem;
  border: 0.1rem solid ${colors.secondary};
  border-radius: 0.5rem;
  color: ${colors.secondary};

  &.active {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const StyledTitle = styled.h3`
  color: ${colors.tertiary};
  letter-spacing: 0.3rem;
  font-weight: bold;
`

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand href="/"><StyledTitle>Block-Cert</StyledTitle></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <StyledNavLink to="/login">Login</StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink to="/signup">Sign Up</StyledNavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
