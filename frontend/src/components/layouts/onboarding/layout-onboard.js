import React from 'react'
import Header from 'components/onboarding/header'

function LayoutOnboard(props) {
    return (
        <div className="app">
            <Header />
            <props.component/>
        </div>
    )
}

export default LayoutOnboard
