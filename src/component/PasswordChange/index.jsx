import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, TextInput, ScrollView } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'

const PasswordChange = ({ updateAuthUser }) => (
    <div>
        <PasswordChangeForm updateAuthUser={updateAuthUser}/>
    </div>
) 

class PasswordChangeFormBase extends Component {
    state = {
        currentPass: '',
        newPassword: '',
        newEmail: '',
        newName: '',
        error: null
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    reauthenticate = (currentPassword) => {
        const { newEmail, newPassword, newName } = this.state
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
                            this.props.history.push('/home')
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

    changeEmail = ( newEmail) => {
          var user = this.props.firebase.auth.currentUser;
          user.updateEmail(newEmail).then(() => {
            console.log("Email updated!");
          }).catch((error) => { console.log(error); });
      }

    changePassword = (newPassword) => {
          let user = this.props.firebase.auth.currentUser;
          user.updatePassword(newPassword).then((authUser) => {
            console.log("Password updated!");
            console.log(authUser);
          }).catch((err) =>  this.setState({error: err}) );
      }

    onSubmit =  e => {
        e.preventDefault()

        try {
            const {newEmail, currentPass, newPassword} = this.state
            
            this.changeEmail(newEmail)
            this.reauthenticate(currentPass)
            this.changePassword(newPassword)
        
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        const {newName, currentPass, newPassword, newEmail, error} = this.state
        return (
          <div>
            <h1>Do you want to change your user account?</h1>
           
            <Form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
                    <h2>Enter Your New Username: </h2>
                    <input type="text" className="passworForm" autoComplete="off" autoCapitalize="none" name="newName"  value={newName} onChange={this.onChange} placeholder="Type in Your New Username"  />
                </div>
                 <div className="field">
                    <h2>Enter Your Current Password: </h2>
                    <input type="password" className="passwordForm" autoComplete="off" autoCapitalize="none" name="currentPass"  value={currentPass} onChange={this.onChange} placeholder="Type in Your Current Password"  />
                </div>
                <div className="field">
                    <h2>Enter Your New Password: </h2>
                    <input type="password" className="passwordForm" autoComplete="off" name="newPassword" value={newPassword} onChange={this.onChange} placeholder="Enter Your New Password" />
                </div>
           
                <div className="field">
                    <h2>Enter New Email Address: </h2>
                    <input type="email" className="newEmail" autoComplete="off" name="newEmail" value={newEmail} onChange={this.onChange} placeholder="Change Email Address" />
                </div> 
       
                <Button type="submit" >Confirm Request</Button>
                {error && error.message} 
            </Form>
          </div>
        )
    }
}

const PasswordChangeForm = withRouter(withFirebase(PasswordChangeFormBase))

export default PasswordChange