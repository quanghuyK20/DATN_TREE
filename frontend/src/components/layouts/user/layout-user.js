import React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'
import CategoryUser from 'components/user/category-user'
import './layout-user.scss'

function LayoutUser(props) {
    return (
        <div className="app">
            <Header />
            <div className="grid margin-top__layout">
                <div className="grid__row mt-4">
                    <div className="grid__column-2">
                        <CategoryUser />
                    </div>
                    <props.component/>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default LayoutUser
