import React, {Component}  from 'react'
import { withRouter} from 'react-router-dom'
import {withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignUp = (props) => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm setUserId={props.setUserId}/>
    </div>
)

class SignUpFormBase extends Component {
    state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    }

    // catch is used instead of if, else statements
    onSubmit = e => {
        const { email, passwordOne, username } = this.state
        e.preventDefault()
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            return this.props.firebase.db.collection('users').doc(authUser.uid).set({
                username,
                email
            }) 
            }
            // this firestore creates a username or email if it doesn't exist yet in cloud
          ).then(()=> {
              this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
              this.setState({error})
          })

    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state

        const isInvalid = 
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';
        
        return (
            <form onSubmit={this.onSubmit}>
                <input
                  name='username'
                  value={username}
                  onChange={this.onChange}
                  type='text'
                  placeholder='Username'
                />
                <input
                  name='email'
                  value={email}
                  onChange={this.onChange}
                  type='email'
                  placeholder='Email'
                />
                <input
                  name='passwordOne'
                  value={passwordOne}
                  onChange={this.onChange}
                  type='password'
                  placeholder='Password'
                />
                <input
                  name='passwordTwo'
                  value={passwordTwo}
                  onChange={this.onChange}
                  type='password'
                  placeholder='Confirm Password'
                />

                <button type='submit' disabled={isInvalid}>Register</button>
                {error && error.message}
            </form>
        )
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUp