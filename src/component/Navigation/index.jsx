import React from 'react'
import { NavLink } from 'react-router-dom'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import '../../App.css'

const Navigation = ({authUser}) => (
    <div>
        {authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}
    </div>
)

  const NavigationAuth = ({authUser}) => (

    <div className="ui menu">
        <div className="item">
            <div className="ui primary button"><NavLink to={ROUTES.LANDING}><i className="map marker alternate icon"></i>Landing</NavLink></div>
        </div>
        <div className="item">
            <div className="ui button"><NavLink to={ROUTES.HOME}><i className="home icon"></i>Home</NavLink></div>
        </div>
        <div className="item">
            <div className="ui button"><NavLink to={ROUTES.ACCOUNT}><i className="address card outline icon"></i>Account</NavLink></div>
        </div>
        <div className="item">
            <span id="userName">{authUser.username}</span> <SignOutButton />
        </div>
    </div>
)


    const NavigationNonAuth = () => (
        <div className="ui menu">
            <div className="item">
                <div className="ui primary button"><NavLink to={ROUTES.LANDING}>Landing</NavLink></div>
            </div>
            <div className="item">
                <div className="ui button"><NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink></div>
            </div>
            <div className="item">
                <div className="ui button"><NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink></div>
            </div>
        </div>
    )


export default Navigation