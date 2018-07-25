import React, { Component } from 'react';
import { Link,  withRouter, } from 'react-router-dom';

import './SignUp.css';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.LANDING);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="form">
        <table align="center">
          <tr>
            <td> Name </td>
            <td> <input value={username} onChange={event => this.setState(byPropKey('username', event.target.value))} type="text" className="text" size="50"/></td>
          </tr>
          <br />
          <tr>
            <td> Email </td>
            <td> <input value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" className="text" size="50"/></td>
          </tr>
          <br />
          <tr>
            <td> Password </td>
            <td> <input value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password" className="text" size="50"/></td>
          </tr>
          <br />
          <tr>
            <td> Confirm Password </td>
            <td> <input value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password" className="text" size="50"/></td>
          </tr>
          <br />
          <tr>
            <td colspan="2"> <button disabled={isInvalid} type="submit" className="button">Sign Up </button></td>
          </tr>
          <br />
          <tr>
            <td colspan="2"> { error && <p>{error.message}</p> }</td>
          </tr>
        </table>
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};