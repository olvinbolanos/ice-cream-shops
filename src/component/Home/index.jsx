import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'

class Home extends Component {
  state = {
    user: {
      username: '',
      email: ''
    }
  }

   componentDidMount() {
    this.props.userId 
    && this.props.firebase
      .user(this.props.userId).once('value')
      .then(snapShot => {
        this.setState({
          user: {
            username: snapShot.val().username,
            email: snapShot.val().email
          }
        }) 
      })
    }

  render() {
    console.log(this.props.firebase.userId)
    return (
      <div>
        <div>This is Firebase and stuff</div>
        <h1>this is the username {this.state.user.username}</h1>
        <h2>This is the email {this.state.user.email}</h2>
      </div>
    )
  }
}

export default withFirebase(withRouter(Home))

// this is called react.context