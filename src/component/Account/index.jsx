import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import PasswordChange from '../PasswordChange'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, TextInput, ScrollView } from 'semantic-ui-react'
import '../../App.css'

import * as ROUTES from '../../constants/routes'

class Account extends Component {

    render() {
        console.log(this.props.authUser, '<-- this is the user in account')
        return (
        <div className='accountImg'>
            <header>
            <div id="topnav" className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                    <h1 className="accountHeading">Account</h1>
                    <PasswordChange authUser={this.props.authUser} updateAuthUser={this.props.updateAuthUser}/>
                    <div className="logo">
                    </div>
                    <div>
                    </div>
                    </div>
                </div>
            </div>
            </header> 
        </div>
        )
    }
}


export default withFirebase(withRouter(Account))
