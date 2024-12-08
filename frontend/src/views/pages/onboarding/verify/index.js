import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from 'hooks/useAuth';
import { Button, Image } from 'antd/lib';
import logo from '../../../../assets/tick-greem.png';
import { useNavigate } from 'react-router-dom';


function OnboardVerify() {
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
                                <h1>Đăng ký thành công</h1>
                               
                        </div>
                        <div className='p-2 d-flex justify-content-center'>
                            <h3>Hệ thống sẽ tiến hành xác thực những thông tin trên. Bạn vui lòng chờ mail phản hồi.</h3>
                        </div>
                        
                        <div className="p-2 d-flex justify-content-center">
                                <Button className="px-4  btn-onboard" onClick={( () => navigate("/home") )}>Trang chủ</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardVerify

