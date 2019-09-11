import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignIn = () => (
  <div>
    <h1 className="landingHeading">SignIn</h1>
    <SignInForm />
    <SignUpLink />
    <ForgotPasswordLink />
  </div>
)

class SignInFormBase extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  onSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => 
        this.props.history.push(ROUTES.HOME)
      )
      .catch(error => {
        this.setState({error})
      })
  }

  onChange = event => 
    this.setState({ [event.target.name] : event.target.value})

  render() {
    const { email, password, error } = this.state
    const isInvalid = 
        password === '' ||
        email === '';

    return (
      
      <form className="ui large form" onSubmit={this.onSubmit}>
      <div className="ui stacked segment">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input 
              name='email'
              type='text'
              value={email}
              onChange={this.onChange}
              placeholder='Email Address'
            />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input 
              name='password'
              type='password'
              value={password}
              onChange={this.onChange}
              placeholder='Password'
            />          
        </div>
        </div>
        <button type='submit' className="ui fluid large blue submit button" disabled={isInvalid}>Sign In</button>
        {error && error.message}
      </div>
        

    </form>
    )
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

const SignUpLink = () => (
  <div className="ui message">
    <p>
      Don't have an account? <NavLink exact to={ROUTES.SIGN_UP}>Sign Up</NavLink>
    </p>
  </div>
)

const ForgotPasswordLink = () => (
  <div className="ui message">
    <p>
      Don't remember your password. That's fine, 
        <NavLink exact to={ROUTES.PASSWORD_FORGET}> Click here</NavLink>
    </p>
  </div>
)
export default SignIn