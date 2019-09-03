import React from 'react'
import { NavLink } from 'react-router-dom'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

console.log('routes ', ROUTES)
const Navigation = ({authUser}) => (
    <div>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
)

  const NavigationAuth = ({authUser}) => (
    <ul>
        <li>
            <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
        </li>
        <li>
           <SignOutButton />
        </li>
    </ul>
)


    const NavigationNonAuth = () => (
        <ul>
            <li>
                <NavLink to={ROUTES.LANDING}>Landing</NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
            </li>
            {/* <li>
                {authUser.username ? <NavigationAuth authUser={} />}
            </li> */}
        </ul>
    )


export default Navigation