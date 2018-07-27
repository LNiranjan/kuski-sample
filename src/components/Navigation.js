import React from 'react';
import { auth } from '../firebase';
import{Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import AuthUserContext from './AuthUserContext';
import './Navigation.css';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
  const NavigationAuth = () =>
  <div>
    <Navbar color="light"  light expand="md">
      <NavbarBrand className="nav" href="/">Kuski</NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav  className="ml-auto" navbar>
          <NavItem>
            <NavLink href="./Account">Account</NavLink>
          </NavItem>
          <NavItem >
            <NavLink href="./Home">Home</NavLink>
          </NavItem>
          <NavItem>
          <NavLink href="/" onClick={auth.doSignOut}>SignOut</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>

const NavigationNonAuth = () =>
<div>
    <Navbar color="light"  light expand="md">
      <NavbarBrand className="nav" href="/">Kuski</NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav  className="ml-auto" navbar> 
          <NavItem >
            <NavLink href="./signin">SignIn</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="./signup">SignUp</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>

export default Navigation;