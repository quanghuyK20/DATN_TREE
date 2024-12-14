import { useEffect, useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import messages from '../../../assets/lang/messages'
import authApi from 'api/auth'
import useAuth from 'hooks/useAuth'
// import background from '../../../assets/images/logo-login.jpg'
import background from '../../../assets/images/logo_login_002.png'
import avatar from '../../../assets/images/avatar.svg'
import Notification from 'components/notification'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'
import './login.scss'

function Login() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const { setToken } = useAuth()
    const handleSubmit = async (values) => {
        try {
            const response = await authApi.login(values)
            if (response.request.status === 200) {
                setToken(response.data.token)
                setIsSuccess(true);
            }
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            setIsError(true);
        }
    }

    const handleForgotPasswordSubmit = async (values) => {
        try {
            const response = await authApi.forgotPassword(values)
            alert(response.data.message)
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
        setIsModalVisible(false)
    }

    useEffect(()=>{
        function start(){
            gapi.client.init({
                // clientId: '348455066010-71i65326dpjs2f7vjk9t2d9farqd8lvg.apps.googleusercontent.com',
                clientId: '930708777668-6fsosi735h8nh06mk6m2lrnd6ktaeoov.apps.googleusercontent.com',
                scope: "profile email"
            })
        };
        gapi.load('client:auth2', start);
    })

    const handleGoogleLoginSuccess = async (res) => {
        const response = await authApi.loginGoogle({ token: res.accessToken })
        if (response.request.status === 200) {
            setToken(response.data.token)
            setIsSuccess(true);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log("error", error);
    }

    return (
        <div>
             {
                isSuccess ? (
                    <Notification type="success" message="Đăng nhập thành công!" navigation="home"/>)
                :(
                    <div></div>
                )
              
            }
            {
                 isError ? (
                    <Notification type="error" message="Tài khoản hoặc mật khẩu không chính xác!" />)
                :(
                    <div></div>
                )
            }
            <div className="login-container">
                <div className="login-container__sub">
                    <img
                        className="login-container__sub__image"
                        src={background}
                        alt={'backgound'}
                    />
                    <div className="login-container__sub__content">
                        <Form
                            name="login"
                            className="login-container__sub__content__form"
                            onFinish={handleSubmit}
                        >
                            <img
                                className="image-avatar"
                                src={avatar}
                                alt={'avatar'}
                            />
                            <h2>Welcome</h2>
                            <div className="login-container__sub__content__form__item">
                                <i>
                                    <UserOutlined />
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
    
                            <div className="login-container__sub__content__form__item">
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


                            <Modal
                                className="forgot-password-modal"
                                title="Quên mật khẩu"
                                open={isModalVisible}
                                onOk={form.submit}
                                onCancel={handleCancel}
                            >
                                <Form
                                    form={form}
                                    onFinish={handleForgotPasswordSubmit}
                                >
                                    <h3>Email</h3>
                                    <div className="forgot-password-modal__email">
                                        <i className="forgot-password-modal__email__icon">
                                            <UserOutlined className="icon" />
                                        </i>
                                        <Form.Item
                                            className="forgot-password-modal__email__item"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        messages['email_required'],
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        messages['invalid_email'],
                                                },
                                            ]}
                                        >
                                            <Input
                                                name="forgot-password-email"
                                                type="email"
                                                placeholder="Email"
                                                size="large"
                                                className="forgot-password-modal__email__item__input"
                                            />
                                        </Form.Item>
                                    </div>
                                </Form>
                            </Modal>
    
                            <Button
                                className="button-submit"
                                type="primary"
                                htmlType="submit"
                            >
                                LOGIN
                            </Button>
                            <div className='d-flex justify-content-between'>
                                <label className="create-account" onClick={()=>{navigate('/register')}}>
                                    Create new account{' '}
                                </label>
                                <label className="forgot-password" onClick={showModal}>
                                Forgot Password
                                 </label>
                            </div>
                            <GoogleLogin
                                    className="button-google"
                                    // clientId="348455066010-71i65326dpjs2f7vjk9t2d9farqd8lvg.apps.googleusercontent.com"
                                    clientId='930708777668-6fsosi735h8nh06mk6m2lrnd6ktaeoov.apps.googleusercontent.com'
                                    buttonText="Login with Google"
                                    onSuccess={handleGoogleLoginSuccess}
                                    onFailure={handleGoogleLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                    // isSignedIn={true}
                                />
                            {/* <div id='signInDiv'></div> */}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
