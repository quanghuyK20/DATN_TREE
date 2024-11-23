import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from 'hooks/useAuth';
import { Button, Image } from 'antd/lib';
// import logo from '../../../assets/images/logo-white-drop.png';
import logo from '../../../assets/images/logo_login_002.png'
import { useNavigate } from 'react-router-dom';
import * as role from '../../../shared/constants/role'
import './onboarding.scss'


function Onboarding() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const navigate = useNavigate();

    return (
        <div>
            <div className="grid mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center'>
                            <Image src={logo}/>
                        </div>
                        <div className='p-2 d-flex justify-content-center'>
                                <h1>Chào mừng đến HyTree Da Nang!</h1>
                        </div>
                        <div className='p-2 d-flex justify-content-center'>
                            {
                                user.role_id === role.SELLER ? ( <h3>Để đăng ký bán hàng trên HyTree Da Nang, bạn cần cung cấp một số thông tin cơ bản.</h3>) :
                                user.role_id === role.SHIPPING_UNIT ? ( <h3>Để đăng ký đơn vị vận chuyển trên HyTree Da Nang, bạn cần cung cấp một số thông tin cơ bản.</h3>) :
                                (<h3>Để đăng ký shipper trên HyTree Da Nang, bạn cần cung cấp một số thông tin cơ bản.</h3>)
                            }
                            <h3></h3>
                        </div>
                        
                        <div className="p-2 d-flex justify-content-center">
                            <Button className="px-4 btn-onboard" onClick={( () => navigate("/onboarding/form") )}>Đăng ký</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding

