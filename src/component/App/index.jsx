import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import {withFirebase} from '../Firebase'

import * as ROUTES from '../../constants/routes'


class App extends  Component  {
  state = {
    authUser: null,
    uid: ''
  }

  async componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({authUser}) : 
      this.setState({authUser: null})
    })
  }

  render() {
    console.log(this.state.authUser)
  return (
  <div>
    <Navigation authUser={this.state.authUser}/>
    <hr />
    <Switch>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> 
      <Route exact path={ROUTES.HOME} render={() => <HomePage /> }/>
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
    </Switch>
  </div>
  )
}
}

export default withFirebase(App)