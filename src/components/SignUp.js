import React, { Component } from 'react';
import { Link,  withRouter, } from 'react-router-dom';

import './SignUp.css';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { FormGroup,Form,Button,Input} from 'reactstrap';

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
    Phonenum:'',
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
        Phonenum,
        passwordOne,
      } = this.state;
      const {
        history,
      } = this.props;
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          db.doCreateUser(authUser.user.uid, username, email, Phonenum)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
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
          Phonenum,
          error,
        } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''||
      Phonenum === '';
      return (
        <Form onSubmit={this.onSubmit} >
          <FormGroup>
             <Input value={username} onChange={event => this.setState(byPropKey('username', event.target.value))} type="text" placeholder="Username" />
          </FormGroup>
          <FormGroup>
            <Input value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email"/>
          </FormGroup>
          <FormGroup>
              <Input value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password" placeholder="Password"/>
          </FormGroup>
          <FormGroup>
             <Input value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password" placeholder="ConfirmPassword"/>
          </FormGroup>
          <FormGroup>
             <Input value={Phonenum} onChange={event => this.setState(byPropKey('Phonenum', event.target.value))} type="number" placeholder="phonenumber"/>
          </FormGroup>
          <FormGroup>
            <Button disabled={isInvalid} color="primary" block>Submit</Button>
          </FormGroup>
          { error && <p>{error.message}</p> }
        </Form>
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