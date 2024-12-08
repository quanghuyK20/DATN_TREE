import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/logo-white.png';
import * as role from '../../../shared/constants/role'

function HeaderOnboarding() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    return (
           <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand d-flex d-inline-block">
                    <img src={logo} width="60" height="60" class="align-center" alt=""/>
                    {
                        user.role_id === role.SELLER ? (<h2 className='mt-3'> Đăng ký trở thành Người bán tại HyTree Da Nang</h2>) :
                        user.role_id === role.SHIPPING_UNIT ? (<h2 className='mt-3'> Đăng ký trở thành Đơn vị vận chuyển tại HyTree Da Nang</h2>) :
                        (<h2 className='mt-3'> Đăng ký trở thành Shipper tại HyTree Da Nang</h2>)
                    }
                    
                </a>
                <div className='d-flex p4'>
                    <img src={process.env.REACT_APP_API_URL + 'images/users/default-avatar.png'} width="60" height="60" class="align-center" alt=""/>
                    <h2 className='mt-4'>{user.name}</h2>
                </div>
            </nav>
    )
}

export default HeaderOnboarding

