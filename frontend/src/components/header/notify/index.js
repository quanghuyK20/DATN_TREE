import React from 'react'
import "./notify.scss"

function Notify() {
    return (
        <div className="header__notify">
            <header className="header__notify-header">
                <h3>Thông báo mới nhận</h3>
            </header>
            <ul className="header__notify-list">
                <li className="header__notify-item header__notify-item--viewed">
                    <a href="" className="header__notify-link">
                        <img src={process.env.REACT_APP_API_URL + 'images/products/Chokkan/3.jpg'} alt="" className="header__notify-img" />
                        <div className="header__notify-info">
                            <span className="header__notify-name">Cây dáng chokkan đã được thêm vào giỏ hàng của bạn</span>
                            <span className="header__notify-descript">Cây dáng trực, tàn 50cm</span>
                        </div>
                    </a>
                </li>
            </ul>
            <footer className="header__notify-footer">
                <a href="" className="header__notify-footer-btn">
                    Xem tất cả
                </a>
            </footer>
        </div>
    )
}

export default Notify
