import React from 'react'
import {FacebookOutlined, BellOutlined, WhatsAppOutlined, GoogleOutlined, ChromeOutlined, DownOutlined } from '@ant-design/icons'
import qrcode from '../../assets/images/QR.png'
import appstore from '../../assets/images/App-store.png'
import chPlay from '../../assets/images/CH-play.png'
// import logo from '../../assets/images/logo-big-removebg-preview.png'
import logo from '../../assets/images/logo02-Photoroom.png'
import Cart from './cart'
import Notify from './notify'
import Account from './account'
import Search from './search'
import './baseHeader.scss'
import './header.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <div className="grid">
                <nav className="header__navbar">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-mg-top header__navbar-item header__navbar-item-has-qr header__navbar-item--separate">
                            Tải ứng dụng bằng QR code nào
                            <div className="header__qr">
                                <img
                                    src={qrcode}
                                    alt={'QR code'}
                                    className="header__qr-img" />
                                <div className="header__qr-apps">
                                    <a href="" className="header__qr-link">
                                        <img
                                            src={appstore}
                                            alt={'App Store'}
                                            className="header__qr-download-img" />
                                    </a>
                                    <a href="" className="header__qr-link">
                                        <img
                                            src={chPlay}
                                            alt={'backgound'}
                                            className="header__qr-download-img" />
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="header__navbar-item">
                            <span className="header__navbar-item-no-pointer">
                                Kết nối
                            </span>
                            <a href="https://www.facebook.com/huylq.albedo/" className="header__navbar-item-link">
                                <i className="header__navbar-icon">
                                    <FacebookOutlined />
                                </i>
                            </a>
                            <a href="https://www.google.com/search?sca_esv=306df196934c4ef8&sxsrf=ADLYWILtIZoAXc13g8xgR96y9WzAKVGDPg:1731250130494&q=c%C3%A2y+ti%E1%BB%83u+c%E1%BA%A3nh+%C4%90%C3%A0+N%E1%BA%B5ng&udm=2&fbs=AEQNm0D7NTKsOqMPi-yhU7bWDsijXeHIssQxQHiKhz3Orm0Szk2q6O3Esev6DIwpyqAb2Bjzw1c6tpecNpib8dXrzqvm5FMzVkDrTKys67-6kfgAa6o7fS3L60sG8PQKgsVv2SlIMaE11hJJlapnszVLagKF5CpXSkPSwpC90rPA5Y02JZeAT7ErHFHM2HqVFtcnvifGPoQuY5mbb3gYhw4O751kfK2oqwFvRxoTD7X0azS5wTlUlHs&sa=X&ved=2ahUKEwjCs6mogdKJAxVKs1YBHRc2Iq4QtKgLegQICBAB&biw=1912&bih=873&dpr=1" className="header__navbar-item-link">
                                <i className="header__navbar-icon">
                                    <GoogleOutlined />
                                </i>
                            </a>
                        </li>
                    </ul>
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item header__navbar-item-has-notify">
                            <a href="" className="header__navbar-item-link">
                                <i className="header__navbar-icon far fa-bell">
                                    <BellOutlined />
                                </i>
                                Thông báo
                            </a>
                            <Notify />
                        </li>
                        <li className="header__navbar-item">
                            <a href="" className="header__navbar-item-link">
                                <i className="header__navbar-icon">
                                    <WhatsAppOutlined />
                                </i>
                                Trợ giúp
                            </a>
                        </li>
                        {/* <li className="header__navbar-item">
                            <a href="" className="header__navbar-item-link">
                                <i className="header__navbar-icon">
                                    <ChromeOutlined />
                                </i>
                                Tiếng việt
                                <i className="header__navbar-icon">
                                    <DownOutlined />
                                </i>
                            </a>
                        </li> */}
                        <li className="header__navbar-item">
                            <Account />
                        </li>
                    </ul>
                </nav>
                <div className="header-with-search">
                    <div className="header__logo">
                        <Link to="/home" className="header__logo-link">
                            <img
                                src={logo}
                                alt={'backgound'}
                                className="header__logo-img" 
                                />
                        </Link>
                    </div>
                    <Search />
                    <Cart />
                </div>
            </div>
        </header>
    )
}

export default Header
