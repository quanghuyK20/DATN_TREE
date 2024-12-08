import React from 'react'
import Header from 'components/header'
import Footer from 'components/footer'
import ChatBox from 'components/chatbox'
import useAuth from "hooks/useAuth";

function LayoutCustomer(props) {
    const { user } = useAuth()
    return (
        <div className="app">
            <Header />
            <props.component />
            {user?.role_id === 2 ? (<ChatBox />): (<div></div>)}
            <Footer/>
        </div>
    )
}

export default LayoutCustomer
