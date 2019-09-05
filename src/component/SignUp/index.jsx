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
        error: null,
        image: null
    }

    // catch is used instead of if, else statements
    onSubmit = e => {
        e.preventDefault()
        const { email, passwordOne, username, image } = this.state
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            if (image) {
                this.props.firebase.storage.ref('profile').child(image.name).put(image)
                .then(file => file.ref.getDownloadURL())
                .then(url => this.props.firebase.db.collection('users').doc(authUser.user.uid)
                  .set({
                      username,
                      email,
                      image: url
                  })) 
            } else {
                return this.props.firebase.db.collection('users').doc(authUser.user.uid).set({
                    username,
                    email
                })
            }
            }
            // this firestore creates a username or email if it doesn't exist yet in cloud
          ).then(()=> {
              this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
              this.setState({error})
              setTimeout(() => this.setState({error: null}))
          })

    }

    onChange = event => {
        this.setState({
          [event.target.name] : event.target.name.includes('image') 
            ? event.target.files[0] 
            : event.target.value 
        })
    }


    render() {
        console.log(this.state)
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
                <input type="file" 
                name="image" 
                accept="image/png, image/jpeg, image/jpg" 
                onChange={this.onChange} />

                <button type='submit' disabled={isInvalid}>Register</button>
                {error && error.message}
            </form>
        )
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUp