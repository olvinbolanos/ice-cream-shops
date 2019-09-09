import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, TextInput, ScrollView } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'

const PasswordChange = () => (
    <div>
        <PasswordChangeForm />
    </div>
) 

class PasswordChangeFormBase extends Component {
    state = {
        currentPass: '',
        newPassword: '',
        confirmPass: '',
        error: null
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const {newPassword} = this.state
        this.props.firebase
        .doPasswordUpdate(newPassword)
        .then(() => 
          this.props.history.push(ROUTES.HOME)
        )
        .catch((error) => {
            this.setState({error})
            setTimeout(()=> this.setState({error}), 1000)
        })
    }

    async componentDidMount () {
        this.reauthenticate()
    }

    reauthenticate = async () => {
        const user = await this.props.firebase.auth
        // const cred = this.props.firebase.doSignInWithEmailAndPassword.credential(user.email, currentPass)
        console.log(user)
    }

    render() {
        const {confirmPass, currentPass, newPassword, error} = this.state
        
        return (
          <div>
            <h1>Do you want to change your password?</h1>
           
            <Form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <h2>Enter Your Old Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="currentPass"  value={currentPass} onChange={this.onChange} placeholder="Type in Your Old Password"  />
                </div>
                <div className="field">
                    <h2>Enter Your New Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="newPassword" value={newPassword} onChange={this.onChange} placeholder="Enter Your New Password" />
                </div>
                <div className="field">
                    <h2>Confirm Your New Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="confirmPass" value={confirmPass} onChange={this.onChange} placeholder="Confirm Password Again" />
                </div>
                <Button type="submit">Confirm Request</Button>
                {error && error.message}
            </Form>
          </div>
        )
    }
}

const PasswordChangeForm = withRouter(withFirebase(PasswordChangeFormBase))

export default PasswordChange