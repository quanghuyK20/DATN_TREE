import { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import {
    UserOutlined,
    UnlockOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import messages from '../../../assets/lang/messages'
import auth from 'api/auth'
// import background from '../../../assets/images/logo-login.jpg'
import background from '../../../assets/images/logo_login_002.png'
import avatar from '../../../assets/images/avatar.svg'
import Notification from 'components/notification'
import * as role from '../../../shared/constants/role'
import './register.scss'

const { Option } = Select

function Register() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [responseRole, setResponseRole] = useState();
    const handleSubmit = async (values) => {
        try {
            values.role_id = parseInt(values.role_id)
            const response = await auth.register(values)
            if (response.request.status === 200) {
                console.log("response.data.user",response.data);
                localStorage.setItem('user',JSON.stringify(response.data.user))
                setResponseRole(response.data.user.role_id)
                setIsSuccess(true);
            }
        } catch (error) {
            setIsError(true);
        }
    }
    return (
        <div>
            {
                isSuccess ? (
                    responseRole === role.CUSTOMER ? (
                        <Notification type="success" message="Đăng kí thành công!" navigation="login" />
                    ) : (
                        <Notification type="success" message="Đăng kí thành công!" navigation="onboarding" />
                    )
                ) : (
                    <div></div>
                )
            }

            {
                 isError ? (
                    <Notification type="error" message="Vui lòng thử lại!" />)
                :(
                    <div></div>
                )
            }
                <div className="register-container">
                    <div className="register-container__sub">
                        <img
                            className="register-container__sub__image"
                            src={background}
                            alt={'backgound'}
                        />
                        <div className="register-container__sub__content">
                            <Form
                                name="register"
                                className="register-container__sub__content__form"
                                onFinish={handleSubmit}
                            >
                                <img
                                    className="image-avatar"
                                    src={avatar}
                                    alt={'avatar'}
                                />
                                <h2>Welcome</h2>
                                <div className="register-container__sub__content__form__item">
                                    <i>
                                        <UserOutlined />
                                    </i>
                                    <Form.Item
                                        className="form-item"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: messages['name_required'],
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="User"
                                            className="input email"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="register-container__sub__content__form__item">
                                    <i>
                                        <MailOutlined />
                                    </i>
                                    <Form.Item
                                        className="form-item"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: messages['email_required'],
                                            },
                                            {
                                                type: 'email',
                                                message: messages['invalid_email'],
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Email"
                                            className="input email"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="register-container__sub__content__form__item">
                                    <i>
                                        <SettingOutlined />
                                    </i>
                                    <Form.Item
                                        className="form-item"
                                        name="role_id"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mời chọn role',
                                            },
                                        ]}
                                    >
                                        <Select defaultValue="">
                                            <Option value="2">Khách hàng</Option>
                                            <Option value="3">Cửa hàng</Option>
                                            <Option value="4">Shipper</Option>
                                            <Option value="5">Đơn vị vận chuyển</Option>
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="register-container__sub__content__form__item">
                                    <i>
                                        <UnlockOutlined />
                                    </i>
                                    <Form.Item
                                        className="form-item"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: messages['password_required'],
                                            },
                                            {
                                                type: 'string',
                                                min: 6,
                                                max: 24,
                                                message:
                                                    messages['invalid_password_length'],
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Password"
                                            className="input password"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="register-container__sub__content__form__item">
                                    <i>
                                        <UnlockOutlined />
                                    </i>
                                    <Form.Item
                                        className="form-item"
                                        name="confirm_password"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages[
                                                        'confirm_password_require'
                                                    ],
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="Confirm password"
                                            className="input confirm-password"
                                        />
                                    </Form.Item>
                                </div>

                                <Button
                                    className="button-submit"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    REGISTER
                                </Button>
                                <p className="have-an-account">
                                    <a className="have-an-account" href="/login">
                                        Login now
                                    </a>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Register
