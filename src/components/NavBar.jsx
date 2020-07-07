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

const StyledTitle = styled(NavbarBrand)`
  outline: 0;

  &:active {
    outline: 0;
  }
  h3 {
    color: ${colors.tertiary};
    font-weight: bold;
    font-weight: bold;
    font-family: cursive;
    letter-spacing: 0.5rem;
  }
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

const NavBar = ({ authenticated, logoutUser, user }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const history = useHistory();
  return (
    <div>
      <Navbar light expand="md">
        <Container>
          <StyledTitle href="/">
            <h3>Block-Cert</h3>
          </StyledTitle>
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
                    <DropdownItem header>{user.email}</DropdownItem>
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
  user: session.user,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
