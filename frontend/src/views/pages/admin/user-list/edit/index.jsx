import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import userApi from 'api/userApi'
import roleApi from 'api/roleApi'
import moment from 'moment'
import uploadImgApi from 'api/uploadApi'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import './edit-account.scss'
import '../../../../../index.scss'

const { Option } = Select

function EditAccount() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
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

            const response = await userApi.updateById(id,values)
            if (uploadAvatar) {
                const postData = new FormData()
                postData.append('avatar', uploadAvatar)
                uploadImgApi.uploadUserAvatar(id, postData)
            }
            alert(response.data.message)
            navigate('/admin/accounts')
        } catch (error) {
            alert(`error:
                {
                  errorInfo: [
                    "${error.code || ''}",
                    ${error.number || ''},
                    "${error.message || error}"
                  ]
                }`);
            // alert(error);
        }
    }

    useEffect(() => {
        roleApi.getRoles().then((response) => {
            setRoleList(response.data)
        })
    }, [])

    useEffect(() => {
        if (id) {
            userApi.getOneById(id).then((response) => {
                console.log("response user-list", response);
                const user = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    role_id: response.data.role_id,
                    gender: response.data.gender,
                    birthday: response.data.birthday,
                    phone_number: response.data.phone_number,
                    address: response.data.address,
                    avatar: response.data.avatar ? response.data.avatar : defaultImageUrl.USER_AVATAR
                }
                setUser(user);
            })
        }
    }, [id])

    return (
        <div className="edit-account-content">
            <div className="title-edit-acounts">Chỉnh sửa người dùng</div>
            <Form
                name="addprofile"
                className="edit-account-content__sub"
                onFinish={handleSubmit}
                fields={[
                    {
                        name: ['name'],
                        value: user.name,
                    },
                    {
                        name: ['email'],
                        value: user.email,
                    },
                    {
                        name: ['role_id'],
                        value: user.role_id,
                    },
                    {
                        name: ['gender'],
                        value: user.gender ? 1 : 0,
                    },
                    {
                        name: ['birthday'],
                        value: moment(user.birthday, 'YYYY/MM/DD'),
                    },
                    {
                        name: ['address'],
                        value: user.address,
                    },
                    {
                        name: ['phone_number'],
                        value: user.phone_number,
                    },
                ]}
            >
                <div className="edit-account-content__sub__avatar">
                    <img
                        id="user-avatar"
                        ref={userAvatarRef}
                        src={process.env.REACT_APP_API_URL + user.avatar}
                        alt="avatar"
                    // onError={handleGetImageError}
                    />
                    <div className="edit-account-content__sub__avatar__button-upload">
                        <label for="image-input">
                            <CameraOutlined className="edit-account-content__sub__avatar__icon" />
                        </label>
                        <input
                            id="image-input"
                            accept="image/*"
                            type="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
                <div className="edit-account-content__sub__info">
                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Họ và tên</span>
                        <Form.Item
                            name="name"
                            initialValue={user.name}
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
                    <div className="edit-account-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="email"
                            initialValue={user.email}
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
                    <div className="edit-account-content__sub__info__item">
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
                            <Select className="select" defaultValue={user.role_id}>
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

                    <div className="edit-account-content__sub__info__item">
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
                            <Radio.Group className="text" defaultValue={user.gender ? 1 : 0}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
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
                            <DatePicker 
                            defaultValue={moment(
                                user.birthday,
                                'YYYY/MM/DD',
                            )} className="text" format="DD/MM/YYYY" />
                        </Form.Item>
                    </div>

                    <div className="edit-account-content__sub__info__item">
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

                    <div className="edit-account-content__sub__info__item">
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
                </div>
                <div className="edit-account-content__sub__button">
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

export default EditAccount
