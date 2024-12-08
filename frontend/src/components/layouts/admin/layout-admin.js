import React from 'react'
import Header from '../../admin/header'
import SiderBar from 'components/admin/siderbar'
import useAuth from 'hooks/useAuth'
import { Layout } from 'antd'

import './layout-admin.scss'

function LayoutAdmin(props) {
    const { collapsed } = useAuth()

    return (
        <div className="body-wrapper-admin">
            <div className="content-wrapper-admin">
                <Layout
                    className={
                        collapsed ? 'main-layout-admin collapsed' : 'main-layout-admin'
                    }
                >
                    <SiderBar className="main-layout-admin__siderbar" />
                    <Layout className="main-layout-admin__content">
                        <Header className="main-layout-admin__content__header" />
                        <div className="main-layout-admin__content__main">
                            <div className="main-layout-admin__content__main__component">
                                <props.component />
                                <div className="main-layout-admin__content__main__footer"></div>
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}

export default LayoutAdmin
