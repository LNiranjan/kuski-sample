import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import './Navigation.css';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
  const NavigationAuth = () =>
  <ul className="arrange">
    {/* <li className="ul"><Link to={routes.LANDING}>Landing</Link></li> */}
    <li className="ul"><Link to={routes.HOME}>Home</Link></li>
    <li className="ul"><Link to={routes.ACCOUNT}>Account</Link></li>
    <li className="ul"><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="arrange">
    <li className="ul"><Link to={routes.SIGN_UP}>SignUp</Link></li>
    <li className="ul"><Link to={routes.SIGN_IN}>SignIn</Link></li>
  </ul>

export default Navigation;