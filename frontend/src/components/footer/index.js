import React from 'react'
import qrCode from 'assets/images/QR.png'
import appStore from 'assets/images/App-store.png'
import chPlay from 'assets/images/CH-play.png'
import "./footer.scss"

function Footer() {
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid-column-2-4">
                        <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Trung tâm trợ giúp</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">BONSAI Blog</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Hướng Dẫn Mua Hàng</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Hướng Dẫn Bán Hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid-column-2-4">
                        <h3 className="footer__heading">Giới thiệu</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Giới Thiệu Về BONSAI Việt Nam</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Tuyển Dụng</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Điều Khoản BONSAI</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Chính Sách Bảo Mật</a>
                            </li>
                        </ul>
                    </div>
                    <div className="grid-column-2-4">
                        <h3 className="footer__heading">Danh mục</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Giới Thiệu Về BONSAI Việt Nam</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Tuyển Dụng</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Điều Khoản BONSAI</a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">Chính Sách Bảo Mật</a>
                            </li>
                        </ul>

                    </div>
                    <div className="grid-column-2-4">
                        <h3 className="footer__heading">Theo dõi</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    <a href="" className="footer-item__icon fab fa-facebook"></a>
                                    Facebook
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    <a href="" className="footer-item__icon fab fa-instagram"></a>
                                    Instagram
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="" className="footer-item__link">
                                    <a href="" className="footer-item__icon  fab fa-linkedin"></a>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>


                    </div>
                    <div className="grid-column-2-4">
                        <h3 className="footer__heading">Android</h3>
                        <div className="footer__download">
                            <img src={qrCode} alt="Download QR" className="footer__download-qr"/>
                                <div className="footer__download-apps">
                                    <a href="" className="footer__download-app-link">
                                        <img src={chPlay} alt="CH play" className="footer__download-app-img"/>
                                    </a>
                                    <a href="" className="footer__download-app-link">
                                        <img src={qrCode} alt="App store" className="footer__download-app-img"/>
                                    </a>

                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="footer__bottom">
                <div className="grid">
                    <p className="footer__text">© 2015 - Bản quyền thuộc về Công ty TNHH BONSAI</p>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer
