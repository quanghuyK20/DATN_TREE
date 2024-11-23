import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import roleApi from 'api/roleApi'
import uploadImgApi from 'api/uploadApi'
// import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './add-account.scss'
import '../../../../../index.scss'

const { Option } = Select

function AddAccount() {
    const navigate = useNavigate()
    const [roleList, setRoleList] = useState([])
    const [uploadAvatar, setUploadAvatar] = useState()
    const userAvatarRef = useRef(null);

    const handleUploadImage = (e) => {
        userAvatarRef.current.src = URL.createObjectURL(e.target.files[0]);
        setUploadAvatar(e.target.files[0])
    }

    const handleSubmit = async (values) => {
        try {
            const inputDate = new Date(values.birthday);
            values.birthday = inputDate.toISOString().slice(0, 19).replace('T', ' ');
            const response = await userApi.createNew(values)
            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('avatar', uploadAvatar)
                uploadImgApi.uploadUserAvatar(response.data.user.id, postData)
            }
            alert(response.data.message)
            navigate('/admin/accounts')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        roleApi.getRoles().then((response) => {
            console.log(response.data);
            setRoleList(response.data)
        })
    }, [])

    return (
        <div className="add-account-content">
            <div className="title-add-acounts">Thêm người dùng</div>
            <Form
                name="addprofile"
                className="add-account-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-account-content__sub__avatar">
                    <img
                        id="user-avatar"
                        ref={userAvatarRef}
                        src={process.env.REACT_APP_API_URL + 'images/users/default-avatar.png'}
                        alt="avatar"
                        // onError={handleGetImageError}
                    />
                    <div className="add-account-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="add-account-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/*"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="add-account-content__sub__info">
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Họ và tên</span>
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
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: messages['invalid_email'],
                                },
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="text" />
                        </Form.Item>
                    </div>
                    <div className="add-account-content__sub__info__item">
                        <span className="span">Role</span>
                        <Form.Item
                            name="role_id"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Select className="select">
                                {roleList.map((item, id) => {
                                    return (
                                        <Option value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Giới tính</span>
                        <Form.Item
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Radio.Group className="text">
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Ngày sinh</span>
                        <Form.Item
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: messages['birthday_required'],
                                },
                            ]}
                        >
                            <DatePicker className="text" format="DD/MM/YYYY" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
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

                    <div className="add-account-content__sub__info__item">
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

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Mật khẩu</span>
                        <Form.Item
                            name="password"
                            className="form-item"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 8,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password className="text" />
                        </Form.Item>
                    </div>

                    <div className="add-account-content__sub__info__item">
                        <span className="span">Nhập lại mật khẩu</span>
                        <Form.Item
                            name="confirm_password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        messages['confirm_password_require'],
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                messages[
                                                    'confirm_password_not_match'
                                                ],
                                            ),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="add-account-content__sub__button">
                    <Link to="/admin/accounts">
                        <Button className="button-gray">Thoát</Button>
                    </Link>
                    <Button
                        className="button-green"
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

export default AddAccount
