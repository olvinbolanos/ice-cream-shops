import React, {Component}  from 'react'
import { withRouter} from 'react-router-dom'
import {withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignUp = (props) => (
    <div>
        <h1 className="landingHeading">Sign Up</h1>
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
          ).then(()=> {
              this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
              this.setState({error})
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
           
        <form className="ui large form" onSubmit={this.onSubmit}>
         <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  name='username'
                  value={username}
                  onChange={this.onChange}
                  type='text'
                  placeholder='Username'
                />              
              </div>
            </div>
            
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  name='email'
                  value={email}
                  onChange={this.onChange}
                  type='email'
                  placeholder='Email'
                />              
                </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  name='passwordOne'
                  value={passwordOne}
                  onChange={this.onChange}
                  type='password'
                  placeholder='New Password'
                />              
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  name='passwordTwo'
                  value={passwordTwo}
                  onChange={this.onChange}
                  type='password'
                  placeholder='Confirm Password'
                />              
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="file" 
                name="image" 
                accept="image/png, image/jpeg, image/jpg" 
                onChange={this.onChange} />            
              </div>
            </div>
            
             <p style={PStyle}>{error && error.message}</p>
            <button type='submit' className="ui fluid large teal submit button" disabled={isInvalid}>Register</button>
          </div>
        </form>
        
        )
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUp

const PStyle = {
  color: 'red',
  textAlign: 'center'
};