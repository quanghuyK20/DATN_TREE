import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const AuthenticatedRoute = ({ ...rest }) => {
    const { user } = useAuth()
    if (user) {
        return rest.acceptedRoles.includes(user.role_id) ? (
            <Outlet />
        ) 
        : (
            <Navigate to="/login" />
        )
    } else {
        return <Navigate to="/login" />
    }
}

export default AuthenticatedRoute
