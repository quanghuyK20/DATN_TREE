import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from 'hooks/useAuth';
import { Button } from 'antd/lib';
import orderApi from 'api/orderApi';


function Account() {
    const { user } = useAuth();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
           const response = orderApi.getProductsOrdersByUser().then((response)=>{
                setProductList(response.data)
           })
    }, [])


    return (
        <div  className="grid__column-10">
            <div className="grid__column-10">
                <div className="card">
                    <div className="card-body">
                        <div className='p-2'>
                            <h1>Hồ Sơ Của Tôi</h1>
                            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        </div>
                        <div className="row mb-3 mt-4">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" value={user.name}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" value={user.email}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Phone</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" value={user.phone_number}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Birthday</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" value={user.birthday}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Address</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control" value={user.address}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 text-secondary">
                                <Button className="btn btn-primary px-4">Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account

