import React, {Component} from 'react'
import {withFirebase} from '../Firebase'
import {withRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';


class Delete extends Component {
    reauthenticate = (currentPassword) => {
        const { newEmail, newName } = this.state
        let user = this.props.firebase.auth.currentUser
        const credential = this.props.firebase.reauthenticate.credential(
            user.email, 
            currentPassword
        )
        user.reauthenticateWithCredential(credential)
            .then(updateUser => {
                let emailRef = this.props.firebase.db.collection('users').doc(updateUser.user.uid)
               
                return emailRef.update({
                  email: newEmail,
                  username: newName 
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.props.firebase.db.collection('users').doc(user.uid)
                        .get()
                        .then(snapShot => {
                            this.props.updateAuthUser(snapShot.data())
                            this.props.history.push('/')
                        })
                    // this.props.updateAuthUser(snapShot.data())
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            })
            .catch(err => this.setState({error: err}))
    }
  
    deleteAccount= () => {
      var user = this.props.firebase.auth.currentUser;
      try {
        user.delete().then(() => {
          console.log("Account Deleted Successfully");
          console.log(user, '<--user deleted')
          this.props.history.push('/')
        }).catch((error) => { console.log(error); });
      } catch(error) {
          console.log(error)
      }
  }

  render() {
    return (
      <button type='button' className="ui button" onClick={this.deleteAccount}>
        <i className="user circle icon"></i>Delete Account
      </button>
    )
  }
}

export default withFirebase(withRouter(Delete))

