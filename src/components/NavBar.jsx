import React, { useState } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import { logoutUser } from "./../app/actions/userActions";

// UI
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { colors } from "./shared";

// React router
import { NavLink, useHistory } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  margin-left: 1rem;
  display: inline-block;
  min-width: 8rem;
  padding: 0.3rem;
  border: 0.1rem solid ${colors.secondary};
  border-radius: 0.5rem;
  color: ${colors.secondary};
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${colors.secondary};
    text-decoration: none;
    color: ${colors.primary};
  }

  &.active {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const StyledTitle = styled.h3`
  color: ${colors.tertiary};
  letter-spacing: 0.3rem;
  font-weight: bold;
`;

const StyledUser = styled(FaUserTie)`
  font-size: 1.8rem;
  color: ${colors.secondary};
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  outline: 0;
  &:hover {
    border-radius: 1rem;
    background-color: ${colors.primary};
  }
`;

const StyledLogout = styled(DropdownItem)`
  justify-content: center;

  &:hover {
    color: ${colors.alternate};
  }
  &:active {
    color: ${colors.primary};
    background-color: ${colors.alternate};
  }
`;

const NavBar = ({ authenticated, logoutUser, session }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const history = useHistory();
  return (
    <div>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand href="/">
            <StyledTitle>Block-Cert</StyledTitle>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={!collapsed} navbar>
            {!authenticated && (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <StyledNavLink to="/login">Login</StyledNavLink>
                </NavItem>
                <NavItem>
                  <StyledNavLink to="/signup">Sign Up</StyledNavLink>
                </NavItem>
              </Nav>
            )}
            {authenticated && (
              <Nav className="ml-auto" navbar>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
                  <StyledDropdownToggle
                    onMouseOver={() => setDropdownOpen(true)}
                    nav
                    caret
                  >
                    <StyledUser />
                  </StyledDropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>Fenty Fantasia</DropdownItem>
                    <DropdownItem divider />
                    <StyledLogout onClick={() => logoutUser(history)}>
                      <FiLogOut /> Log out
                    </StyledLogout>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = ({ user, session }) => ({
  authenticated: session.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
