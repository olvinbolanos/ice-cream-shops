import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import 'semantic-ui-css/semantic.min.css';


class SignOut extends Component {
  
  logOut = () => {
    this.props.firebase.doSignOut()
    this.props.history.push('/')
  }
  render() {
    console.log(this.props, 'props of signout')
    return (
      <button type='button' className="ui button" onClick={this.logOut}>
        Sign Out
      </button>
    )
  }
}


export default withFirebase(withRouter(SignOut))