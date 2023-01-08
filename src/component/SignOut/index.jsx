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
    return (
      <button type='button' className="ui button" onClick={this.logOut}>
        <i className="user circle icon"></i>Sign Out
      </button>
    )
  }
}


export default withFirebase(withRouter(SignOut))