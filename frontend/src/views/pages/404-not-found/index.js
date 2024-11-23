import React from 'react'
import './404-not-found.scss'

function NotFound() {
    return (
        <section className="page-404">
            <h1 className="page-404__title">404</h1>
            <div className="page-404__background">
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt=""
                ></img>
            </div>
            <div className="page-404__content">
                <h3 className="page-404__content__h3"> Looks like you're lost</h3>
                <p className="page-404__content__p">
                    The page you are looking for is not available!
                </p>
                <a href="/" className="page-404__content__link_404">
                    Go to Home Page
                </a>
            </div>
        </section>
    )
}

export default NotFound
