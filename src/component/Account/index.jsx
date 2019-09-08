import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import PasswordChange from '../PasswordChange'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, TextInput, ScrollView } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'

const Account= () => (
    <div>
        <AccountForm />
    </div>
)


class AccountFormBase extends Component{
    constructor(props) {
        super(props)
        this.state = {
            

        }
    }

    render() {
        console.log(this.props.authUser)
        return (
        <div>
            <h1>Account</h1>
            <PasswordChange authUser={this.props.authUser} />
        </div>

        )
    }
}

const AccountForm = withRouter(withFirebase(AccountFormBase))

export default Account