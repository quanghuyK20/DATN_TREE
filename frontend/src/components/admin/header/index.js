import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Dropdown, Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import speaker from 'assets/images/speaker.png'
import './header.scss'


const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
)

function Header() {
    const { user, setToken } = useAuth()
    // const avatarURL = process.env.REACT_APP_API_URL + user.UserInfo?.avatar

    const navigate = useNavigate()
    const handleLogout = () => {
        setToken('null')
        navigate('/login')
    }

    const menu = () => {
        return (
            <Menu
                className="header-admin-menu"
            >
                <Menu.Item key="1">
                    <Link className='header-admin-menu__link' to={`/profile/${user.id}`}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link className='header-admin-menu__link' to="/change-password">Đổi mật khẩu</Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleLogout}>
                    <Link className='header-admin-menu__link'>Đăng xuất</Link> 
                </Menu.Item>
            </Menu>
        )
    }

    const userRole = () => {
        switch (user.role_id) {
            case 1:
                return 'Admin'
            case 2:
                return 'Customer'
            case 3:
                return 'Cửa hàng'
            case 4:
                return 'Shipper'
            default:
                return 'Đơn vị vận chuyển'
        }
    }

    return (
        <div className="header-admin">
            <div className="header-admin-right">
                <Popover
                    className="header-admin-notification"
                    content={content}
                    title="Title"
                    trigger="click"
                >
                    <span className="">
                        <img
                            className="header-admin-notification__icon"
                            src={speaker}
                            alt="speaker"
                        ></img>
                        <span className="header-admin-notification__unread">10</span>
                    </span>
                </Popover>

                <Dropdown overlay={menu} trigger="click">
                    <label
                        className="header-admin-right__content"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            className="header-admin-right__content__avatar"
                            src={process.env.REACT_APP_API_URL + user.avatar}
                            alt="logo"
                        ></img>

                        <div>
                            <div className="header-admin-right__content__name">
                                <span>{user.name}</span>
                            </div>
                            <div className="header-admin-right__content__role">
                                <span>{userRole()}</span>
                            </div>
                        </div>
                        <DownOutlined className="header-admin-right__content__dropdown" />
                    </label>
                </Dropdown>
            </div>
        </div>
    )
}
export default Header
