import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'


const PasswordForget = () => (
    <div>
        <PasswordForgetForm />
    </div>
) 

class PasswordForgetFormBase extends Component {
    state = {
        email: '',
        error: null
    }

    onChange = event => this.setState({ [event.target.name] : event.target.value})
    

    onSubmit = (e) => {
        e.preventDefault()

        const {email} = this.state
        this.props.firebase
        .doPasswordReset(email)
        .then(() => 
          this.props.history.push(ROUTES.SIGN_IN)
        )
        .catch((error) => {
            this.setState({error})
        })
        
    }

    render() {
        const { email, error } = this.state
        return (
          <div>
            <h1>Did you forget your password?</h1>
           
            <Form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <h2>Enter Your Email Address: </h2>
                    <input 
                    name='email'
                    type='text'
                    value={email}
                    onChange={this.onChange}
                    placeholder='Email Address'
                    />  
                </div>
                <Button type="submit">Send Email</Button>
                {error && error.message}
            </Form>
          </div>
        )
    }
}

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase))

export default PasswordForget