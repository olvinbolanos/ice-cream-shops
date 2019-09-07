import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'



const PasswordChange = () => (
    <div>
        <PasswordChangeForm />
    </div>
) 

class PasswordChangeFormBase extends Component {
    state = {
        oldPassword: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const {passwordOne} = this.state
        this.props.firebase
        .doPasswordUpdate(passwordOne)
        .then(() => 
          this.props.history.push(ROUTES.HOME)
        )
        .catch((error) => {
            this.setState({error})
            setTimeout(()=> this.setState({error}), 1000)
        })
    }

    render() {
        const {, error} = this.state
        return (
          <div>
            <h1>Do you want to change your password?</h1>
           
            <Form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <h2>Enter Your Old Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="oldPassword" onChange={this.onChange} placeholder="Type in Your Old Password" src="&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;" />
                </div>
                <div className="field">
                    <h2>Enter Your New Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="passwordOne" onChange={this.onChange} placeholder="Enter Your New Password" />
                </div>
                <div className="field">
                    <h2>Confirm Your New Password: </h2>
                    <input type="password" className="passwordForm" autocomplete="off" name="passwordTwo" onChange={this.onChange} placeholder="Confirm Password Again" />
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