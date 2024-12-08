import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/useAuth'

import * as roles from 'shared/constants/role'

const GuestRoute = () => {
    const { user, token } = useAuth()

    if (token !== 'null' && user !== 'null') {
        localStorage.setItem('selected_sidebar_key', 1)
        if(user){
            switch (user.role_id) {
                case roles.SELLER:
                    return <Navigate to={'/seller/products'} />
                case roles.CUSTOMER:
                    return <Navigate to={'/'} />
                case roles.ADMIN:
                    return <Navigate to={'/admin/accounts'} />
                case roles.SHIPPING_UNIT: 
                    return <Navigate to={'/shipping-unit/shipper'} />
                case roles.SHIPPER: 
                    return <Navigate to={'/shipper/orders'} />
                default:
                    return <Navigate to={'/login'} />
            }
        }else{
            <Navigate to={'/login'} />
        }
    }else {
        <Navigate to={'/login'} />
    }

    return <Outlet />
}

GuestRoute.defaultProps = {
    location: {},
}

export default GuestRoute
