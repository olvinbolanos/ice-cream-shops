import React from 'react'
import {withFirebase} from '../Firebase'
import 'semantic-ui-css/semantic.min.css';


const SignOut = ({firebase}) => {
    console.log(firebase)
    return (
        <div className="item">
            <div className="ui button"  onClick={firebase.doSignOut}>
                Sign out
            </div>
        </div>
    )
}

export default withFirebase(SignOut)    