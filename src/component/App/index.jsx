import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import Reviews from '../Reviews'
import StoresMap from '../StoresMap'
import {withFirebase} from '../Firebase'

import * as ROUTES from '../../constants/routes'

const inputProps = {
  itemsSrc: [
      { id: 0,
        name: 'Los Angeles',
        level: 'basic',
        src: 'https://lovingitvegan.com/wp-content/uploads/2016/11/Matcha-Green-Tea-Ice-Cream-8.jpg'
     },
      {
        id: 1,
        name: 'Chicago',
        level: 'basic',
        src: 'https://minimalistbaker.com/wp-content/uploads/2015/08/AMAZING-5-Ingredient-Vanilla-Coconut-Ice-Cream-Incredibly-simple-perfectly-sweet-INSANELY-creamy-vegan-glutenfree-icecream-dessert-recipe-vanilla-coconuticecream-coconut.jpg'
      },
      {
        id: 2,
        name: 'New York',
        level: 'advanced',
        src: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg'
      },           
    ],
};

class App extends  Component  {
  state = {
    authUser: null
  }

  async componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.props.firebase.user(authUser.uid).get()
          .then(snapShot => this.setState({authUser: snapShot.data()}))
          : this.setState({authUser: null})
    })
  }

  updateAuthUser = user => {
    this.setState({
      authUser: user
    })
  }
  
  render() {
    const {authUser} = this.state
  return (
  <div>
    <Navigation authUser={this.state.authUser}/>
    <hr />
    <Switch>
      <Route exact path={ROUTES.LANDING} render={() => <LandingPage  {...inputProps}/>}  />
      <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> 
      {
        authUser ?
        <Switch>
        <Route exact path={ROUTES.HOME} render={() => <HomePage authUser={this.state.authUser} /> }/>
        <Route exact path={ROUTES.ACCOUNT} render={() => <AccountPage authUser={this.state.authUser} updateAuthUser={this.updateAuthUser}/>} />
        <Route exact path={`${ROUTES.REVIEWS}/:id`} component={Reviews} />
        <Route exact path={`${ROUTES.MAP}/:id`} component={StoresMap} />
        </Switch>
        : null
      }
    </Switch>
  </div>
  )
}
}

export default withFirebase(App)