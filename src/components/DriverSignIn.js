import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes'


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: 'priya',
    password: '',
    error: null,
};

class DriverSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
      email,
            password,
    } = this.state;

        const {
      history,
    } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }
    render() {
        const {
        email,
            password,
            error,
      } = this.state;
        const isInvalid =
            password === '' ||
            email === '';
        return (
            <Form onSubmit={this.onSubmit}>
                <div>
                    <h1>DriverLogin</h1>
                </div>
                <FormGroup>
                    <Input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                </FormGroup>
                <FormGroup>
                    <Button disabled={isInvalid} type="submit" color="primary" size="lg" block>
                        Sign In
                    </Button>
                </FormGroup>
                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}
export default withRouter(DriverSignIn);

export {
    DriverSignIn,
};