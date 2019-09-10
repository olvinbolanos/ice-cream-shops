import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import PasswordChange from '../PasswordChange'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, TextInput, ScrollView } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'

class Account extends Component{
    constructor(props) {
        super(props)
        this.state = {
            // user: {
            //     user: '',
            //     email: ''
            // }
            authUser: null
        }
    }

   

    render() {
        console.log(this.props.authUser, '<-- this is the user in account')
        return (
        <div>
            <h1>Account</h1>
            <PasswordChange authUser={this.props.authUser} updateAuthUser={this.props.updateAuthUser}/>
        </div>

        )
    }
}


export default withFirebase(withRouter(Account))
