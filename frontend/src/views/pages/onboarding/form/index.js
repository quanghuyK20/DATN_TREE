import React, { useState, useEffect,useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Button, Select } from 'antd'
import {
    UserOutlined,
    UnlockOutlined,
    MailOutlined,
    SettingOutlined,
    CameraOutlined
} from '@ant-design/icons'
import messages from '../../../../assets/lang/messages'
import './form.scss'
import storeApi from 'api/storeApi';
import uploadImgApi from 'api/uploadApi';
import { useNavigate } from 'react-router-dom';
import * as role from '../../../../shared/constants/role'
import shippingUnitApi from 'api/shippingUnitApi';
import shipperApi from 'api/shipperApi';
import mailApi from 'api/mailApi';

const { Option } = Select
function OnboardFrom() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [uploadAvatar, setUploadAvatar] = useState()
    const [shippingUnitList, setShippingUnitList] = useState([])

    useEffect(()=>{
        const response  = shippingUnitApi.getAll().then((response)=>{
            console.log("response",response);
            setShippingUnitList(response.data);
        })
    },[])
    const userAvatarRef = useRef(null);

    const handleUploadImage = (e) => {
        userAvatarRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadAvatar(e.target.files[0])
    }

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            if(user.role_id === role.SELLER){
                values.owner_id = user.id;
                const response = await storeApi.createNew(values)
                if (uploadAvatar) {
                    const postData = new FormData()
                    postData.append('avatar', uploadAvatar)
                    await uploadImgApi.uploadStoreImg(response.data.store.id, postData)
                }
                navigate('/onboarding/verify')
            }
            if(user.role_id === role.SHIPPING_UNIT){
                values.owner_id = user.id;
                const response = await shippingUnitApi.createShippingUnit(values)
                if (uploadAvatar) {
                    const postData = new FormData()
                    postData.append('avatar', uploadAvatar)
                    await uploadImgApi.uploadShipperUnitImg(response.data.shippingUnit.id, postData)
                }
                navigate('/onboarding/verify')
            }
            if(user.role_id === role.SHIPPER){
                values.user_id = user.id;
                const response = await shipperApi.createNew(values)
                if (uploadAvatar) {
                    const postData = new FormData()
                    postData.append('avatar', uploadAvatar)
                    await uploadImgApi.uploadUserAvatar(response.data.shipper.id, postData)
                }
                navigate('/onboarding/verify')
            }
            const mail = {
                email : user.email,
                role_id : user.role_id,
                name : user.name
            }
            const response = mailApi.registerMail(mail)
        } catch (error) {
            const response = JSON.parse(error.response.request.responseText);
            let nameError = response.errors.name[0];

            if(nameError === 'The name has already been taken.') {
                nameError = 'Tên shop đã tồn tại !';
            }

            alert(nameError || error)
        }
    }

    return (
        <div className="onboard-form-content">
            {
                user.role_id === role.SELLER ? (<div className="title-add-acounts">Thêm thông tin shop</div>) :
                user.role_id === role.SHIPPING_UNIT ? ( <div className="title-add-acounts">Thêm thông tin đơn vị vận chuyển</div>) :
                (<div className="title-add-acounts">Thêm thông tin người giao hàng</div>)
            }
            
            <Form
                name="addprofile"
                className="onboard-form-content__sub"
                onFinish={handleSubmit}
            >
                <div className="onboard-form-content__sub__avatar">
                    {
                        user.role_id === role.SELLER ? ( 
                            <img
                                id="user-avatar"
                                ref={userAvatarRef}
                                src={process.env.REACT_APP_API_URL + 'images/stores/store-default.png'}
                                alt="avatar"
                            />
                        ) : 
                        user.role_id === role.SHIPPING_UNIT ? (
                            
                            <img
                                id="user-avatar"
                                ref={userAvatarRef}
                                src={process.env.REACT_APP_API_URL + 'images/shipperUnits/shipper-unit-default.png'}
                                alt="avatar"
                            />
                        ) : 
                        (
                            <img
                                id="user-avatar"
                                ref={userAvatarRef}
                                src={process.env.REACT_APP_API_URL + 'images/shipper/shipper-default.png'}
                                alt="avatar"
                            />
                        )
                    }
                        <div className="onboard-form-content__sub__avatar__button-upload">
                            <label for="image-input">
                                <CameraOutlined className="onboard-form-content__sub__avatar__icon" />
                            </label>
                            <input
                                id="image-input"
                                accept="image/*"
                                type="file"
                                onChange={handleUploadImage}
                            />
                        </div>
                </div>
                <div className="onboard-form-content__sub__info">
                    <div className="onboard-form-content__sub__info__item">
                    {
                        user.role_id === role.SELLER ? (<span className="span">Tên shop</span>) :
                        user.role_id === role.SHIPPING_UNIT ? ( <span className="span">Tên đơn vị vận chuyển</span>) :
                        (<span className="span">Tên shipper</span>)
                    }
                        
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input type="name" size="large" className="text" />
                        </Form.Item>
                    </div>

                    {
                        user.role_id === role.SHIPPER ? (
                            <div class="onboard-form-content__sub__info__item">
                                <span className="span">Đơn vị vận chuyển</span>
                                <Form.Item
                                    className="form-item"
                                    name="station_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'mời chọn đơn vị vận chuyển',
                                        },
                                    ]}
                                >
                                    <Select>
                                    {
                                        shippingUnitList.map((oItem) => (
                                            <Option value={oItem.id}>{oItem.name}</Option>
                                        ))
                                    }
                                    </Select>
                                </Form.Item>
                            </div>
                        ) : (<div></div>)
                    }


                    <div className="onboard-form-content__sub__info__item">
                        <span className="span">Địa chỉ</span>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="text" maxLength="1000" />
                        </Form.Item>
                    </div>

                    <div className="onboard-form-content__sub__info__item">
                        <span className="span">Số điện thoại</span>
                        <Form.Item
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                    message: messages['phone_number_required'],
                                },
                                {
                                    pattern: '^([-]?[0-9][0-9]*|0)$',
                                    min: 10,
                                    max: 10,
                                    message: messages['invalid_phone_number'],
                                },
                            ]}
                        >
                            <Input className="text" />
                        </Form.Item>
                    </div>
                    
                    {
                        user.role_id === role.SHIPPING_UNIT ? (  
                        <div className="onboard-form-content__sub__info__item">
                            <span className="span">Đơn giá</span>
                            <Form.Item
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['text_required'],
                                    },
                                    {
                                        pattern: '^([-]?[0-9][0-9]*|0)$',
                                        message: messages['invalid_number'],
                                    },
                                ]}
                            >
                                <Input className="text" />
                            </Form.Item>
                        </div>
                        ) : (<div></div>)
                    }

                </div>
                
                <div className="onboard-form-content__sub__button">
                    <Button
                        className="btn-onboard__form"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default OnboardFrom

