import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
    UserOutlined,
    GiftOutlined,
    MessageOutlined,
    LeftOutlined,
    CheckCircleOutlined,
    RightOutlined,
    SettingOutlined,
    CodepenOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    CarOutlined,
    RocketOutlined,
    SnippetsOutlined
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import * as roles from 'shared/constants/role'
import * as sidebarIcons from 'shared/icons/sidebar-icons'

import './siderbar.scss'

const siderWidth = '100%'
const minimizeSiderWidth = 80

const RenderMenu = () => {
    const { user } = useAuth()
    const { collapsed, setCollapsed } = useAuth()
    const defaultSelectedKey = localStorage.getItem('selected_sidebar_key')

    const toggleCollapsed = () => {
        localStorage.setItem('collapsed', !collapsed)
        setCollapsed(!collapsed)
    }
    const { Sider } = Layout

    const onClickLink = (e, url = '/') => {}

    const handleSelectItem = (e) => {
        localStorage.setItem('selected_sidebar_key', e.key)
    }

    const adminMenu = (
        <>
            <Menu.Item
                key="1"
                icon={<UserOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/accounts">
                    Quản lí tài khoản user
                </Link>
            </Menu.Item>

            <Menu.Item
                key="2"
                icon={<HomeOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/stores">
                    Quản lí cửa hàng
                </Link>
            </Menu.Item>

            <Menu.Item
                key="3"
                icon={<CarOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/shipping-units">
                    Quản lí đơn vị vận chuyển
                </Link>
            </Menu.Item>

            <Menu.Item
                key="4"
                icon={<RocketOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/shippers">
                    Quản lí shipper
                </Link>
            </Menu.Item>


            <Menu.Item
                key="5"
                icon={<CodepenOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/products">
                    Quản lí sản phẩm
                </Link>
            </Menu.Item>


            <Menu.Item
                key="6"
                icon={<CheckCircleOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/verify-request">
                    Quản lí yêu cầu đăng kí
                </Link>
            </Menu.Item>

            <Menu.Item
                key="7"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/packages">
                    Quản lí gói ưu đãi
                </Link>
            </Menu.Item>

            <Menu.Item
                key="8"
                icon={<ShoppingCartOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/orders">
                    Quản lí order
                </Link>
            </Menu.Item>

            <Menu.Item
                key="9"
                icon={<SnippetsOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/admin/feedbacks">
                    Quản lí feedback
                </Link>
            </Menu.Item>

            <Menu.Item
                key="10"
                icon={<SettingOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/setting">
                    Setting
                </Link>
            </Menu.Item>
        </>
    )

    const shopMenu = (
        <>
            <Menu.Item
                key="1"
                icon={<CodepenOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/seller/products">
                    Quản lí sản phẩm
                </Link>
            </Menu.Item>

            <Menu.Item
                key="2"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/seller/vouchers">
                    Quản lí gói ưu đãi
                </Link>
            </Menu.Item>

            <Menu.Item
                key="3"
                icon={<ShoppingCartOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/seller/orders">
                    Quản lí order
                </Link>
            </Menu.Item>

            <Menu.Item
                key="4"
                icon={<SnippetsOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/seller/feedbacks">
                    Quản lí feedback
                </Link>
            </Menu.Item>

            <Menu.Item
                key="5"
                icon={<MessageOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/seller/messengers">
                    Quản lí message
                </Link>
            </Menu.Item>

            <Menu.Item
                key="6"
                icon={<SettingOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/setting">
                    Setting
                </Link>
            </Menu.Item>
        </>
    )

    const shippingUnitMenu = (
        <>
            <Menu.Item
                key="1"
                icon={<UserOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipping-unit/shipper">
                    Quản lí shipper
                </Link>
            </Menu.Item>

            <Menu.Item
                key="2"
                icon={<CheckCircleOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipping-unit/verify">
                    Quản lí yêu cầu đăng ký
                </Link>
            </Menu.Item>

            <Menu.Item
                key="3"
                icon={<CodepenOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipping-unit/orders">
                    Quản lí đơn hàng
                </Link>
            </Menu.Item>

            <Menu.Item
                key="4"
                icon={<SnippetsOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipping-unit/order-status">
                    Quản lí feedback
                </Link>
            </Menu.Item>

            <Menu.Item
                key="5"
                icon={<SettingOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/setting">
                    Setting
                </Link>
            </Menu.Item>
        </>
    )

    const shipperMenu = (
        <>
            <Menu.Item
                key="1"
                icon={<CodepenOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipper/orders">
                    Quản lí đơn hàng
                </Link>
            </Menu.Item>

            <Menu.Item
                key="2"
                icon={<SettingOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar-admin__link" to="/shipping-unit/setting">
                    Setting
                </Link>
            </Menu.Item>
        </>
    )

    return (
        <Layout className="layout-container-admin">
            <Sider
                width={collapsed ? minimizeSiderWidth : siderWidth}
                className="sider-bar-admin"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Link to="/admin/accounts" onClick={(e) => onClickLink(e)}>
                    <div className="sider-bar-admin__logo">
                        {collapsed === false ? (
                            <div className="logo-full" />
                        ) : (
                            <div className="logo-collapsed" />
                        )}
                    </div>
                </Link>
                <Menu
                    defaultSelectedKeys={[defaultSelectedKey]}
                    defaultOpenKeys={['sub1']}
                    inlineCollapsed={collapsed}
                    className="sider-bar__menu"
                    onSelect={(e) => handleSelectItem(e)}
                >
                    {
                        user.role_id === roles.ADMIN ? adminMenu :
                        user.role_id === roles.SELLER ? shopMenu :
                        user.role_id === roles.SHIPPING_UNIT ? shippingUnitMenu :
                        user.role_id === roles.SHIPPER ? shipperMenu :  adminMenu
                    }
                    <div className="scoll-menu">
                        <Button
                            className="scoll-menu-button"
                            onClick={toggleCollapsed}
                        >
                            {collapsed ? <RightOutlined /> : <LeftOutlined />}
                        </Button>
                    </div>
                </Menu>

            </Sider>
        </Layout>
    )
}

export default RenderMenu
