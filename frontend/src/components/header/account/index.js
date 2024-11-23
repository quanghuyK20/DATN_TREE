import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import * as defaultImageUrl from 'shared/constants/defaultImageUrl'
import "./account.scss"

function Account() {
    const { user, setToken } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        setToken('null')
        navigate('/login')
    }
    return (
        <div>
            {
                user ? (
                    <div className="header__navbar-user">
                        {
                            <div>
                                {
                                    user.avatar?.startsWith("https://")  ? (
                                        <img
                                            src={ user.avatar ?  user.avatar : process.env.REACT_APP_API_URL + defaultImageUrl.USER_AVATAR}
                                            alt={'avatar'}
                                        className="header__navbar-user-img" />
                                    ):(
                                        <img
                                            src={ user.avatar ?  process.env.REACT_APP_API_URL + user.avatar : process.env.REACT_APP_API_URL + defaultImageUrl.USER_AVATAR}
                                            alt={'avatar'}
                                        className="header__navbar-user-img" />
                                    )
                                }
                                <span className="header__navbar-user-name">{user.name}</span>
                                <ul className="header__navbar-user-menu">
                                    <li className="header__navbar-user-item">
                                        <Link to="/user/account">Tài khoản của tôi </Link>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <Link to="/user/purchase">Đơn mua</Link>
                                    </li>
                                    <li className="header__navbar-user-item" onClick={handleLogout}>
                                        <Link to="/login">Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                ) : (
                    <div className="header__navbar-user">
                        <Link className="header__navbar-user-name" to="/register">Đăng Ký |</Link>
                        <Link className="header__navbar-user-name" to="/login">Đăng Nhập</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Account
