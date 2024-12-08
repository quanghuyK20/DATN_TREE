import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal, Button } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    CheckOutlined
} from '@ant-design/icons'
import userApi from 'api/userApi'
import useAuth from 'hooks/useAuth'
import '../../../../index.scss'
import './verify-list.scss'
import verifyApi from 'api/verifyApi'
import mailApi from 'api/mailApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

const TAB_STORE_TYPE = 'Cửa hàng'
const TAB_SHIPPING_UNIT_TYPE = 'Đơn vị vận chuyển'

function VerifyList() {
    const { user } = useAuth()
    const [storeList, setStoreList] = useState([])
    const [shippingUnitList, setShippingUnitList] = useState([])
    const [total, setTotal] = useState(0)
    const [showVerifyStoreModal, setShowVerifyStoreModal] = useState(false)
    const [verifyStoreSuccess, setVerifyStoreSuccess] = useState(false)
    const [showVerifyShippingUnitModal, setShowVerifyShippingUnitModal] = useState(false)
    const [verifyShippingUnitSuccess, setVerifyShippingUnitSuccess] = useState(false)
    const [verifyStore, setVerifyStore] = useState({})
    const [verifyShippingUnit, setVerifyShippingUnit] = useState({})
    const [tabActive, setTabActive] = useState(TAB_STORE_TYPE)

    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        is_deleted: null,
    }
    const [params, setParams] = useState(defaultParams)


    const handleVerifyStore = async () => {
        try {
            console.log(verifyStore);
            const response = await verifyApi.verifyStore(verifyStore.id)
            setVerifyStoreSuccess(true)
            const mail = {
                email: verifyStore.email,
                role_id: 3,
                name: verifyStore.name
            }
            const responseMail = await mailApi.verifyMail(mail)
            setShowVerifyStoreModal(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleVerifyShippingUnit = async () => {
        try {
            const response = await verifyApi.verifyShippingUnit(verifyShippingUnit.id)
            setVerifyShippingUnitSuccess(true)
            const mail = {
                email: verifyShippingUnit.email,
                role_id: 5,
                name: verifyShippingUnit.name
            }
            const responseMail = await mailApi.verifyMail(mail)
            setShowVerifyShippingUnitModal(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleCancel = () => {
        setShowVerifyStoreModal(false)
        setShowVerifyShippingUnitModal(false)
    }

    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    ...params,
                    limit: pageSize,
                    page: page,
                })
            },
        },
    }

    useEffect(() => {
        switch (tabActive) {
            case TAB_STORE_TYPE:
                verifyApi.getStoresVerify(params).then((response) => {
                    setTotal(response.data.total)
                    setStoreList(response.data.data.map((oItem) => ({
                        id: oItem.id,
                        avatar: oItem.store_avatar,
                        name: oItem.store_name,
                        email: oItem.email,
                        phone_number: oItem.phone_number,
                        address: oItem.store_address,
                        deleted_at: oItem.deleted_at ? 'Đã xóa' : 'Chưa xóa',
                    })))
                }, [verifyStoreSuccess])
                break
            case TAB_SHIPPING_UNIT_TYPE:
                verifyApi.getShippingUnitVerify(params).then((response) => {
                    setTotal(response.data.total)
                    setShippingUnitList(response.data.data.map((oItem) => ({
                        id: oItem.id,
                        avatar: oItem.avatar,
                        name: oItem.name,
                        email: oItem.email,
                        price: oItem.price,
                        phone_number: oItem.phone_number,
                        address: oItem.address,
                        deleted_at: oItem.deleted_at ? 'Đã xóa' : 'Chưa xóa',
                    })))
                }, [verifyShippingUnitSuccess])
                break
            default:
                break
        }
    }, [params])


    const columnsStore = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '5%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt=""
                    />
                )
            },
        },
        {
            title: 'Chủ cửa hàng',
            dataIndex: 'name',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '28%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deleted_at',
            width: '10%',
            render: (text, record) => (
                <span
                    className={
                        record.deleted_at === 'Đã xóa'
                            ? 'span-red'
                            : 'span-green'
                    }
                >
                    {record.deleted_at}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <CheckOutlined
                        onClick={() => {
                            setShowVerifyStoreModal(true)
                            setVerifyStore(record)
                        }}
                        className="icon-edit"
                    />
                </Space>
            ),
        }
    ]

    const columnsShippingUnit = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '5%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt=""
                    />
                )
            },
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'name',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            width: '15%',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'deleted_at',
            width: '10%',
            render: (text, record) => (
                <span
                    className={
                        record.deleted_at === 'Đã xóa'
                            ? 'span-red'
                            : 'span-green'
                    }
                >
                    {record.deleted_at}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <CheckOutlined
                        onClick={() => {
                            setShowVerifyShippingUnitModal(true)
                            setVerifyShippingUnit(record)
                        }}
                        className="icon-edit"
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="verify-list-menu">
                <div className="verify-list-menu__item">
                    <div className="verify-list-menu__item__row">
                        <span className="verify-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="verify-list-menu__item__row__select"
                            onChange={(e) => {
                                e.target.value === 'All'
                                    ? setParams({ ...params, is_deleted: null })
                                    : setParams({
                                        ...params,
                                        is_deleted: e.target.value,
                                    })
                            }}
                        >
                            <option key={0} value={'All'}>
                                All
                            </option>
                            <option key={1} value={0}>
                                Chưa xóa
                            </option>
                            <option key={2} value={1}>
                                Đã xóa
                            </option>
                        </select>
                    </div>
                </div>
            </Menu>
        )
    }


    return (
        <div>
            <div className="title">Danh sách tài khoản cần xác thực</div>
            <div className="verify-list-content__swap-page">
                <button
                    className={
                        tabActive === TAB_STORE_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_STORE_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Cửa hàng
                </button>
                <button
                    className={
                        tabActive === TAB_SHIPPING_UNIT_TYPE
                            ? 'button-active'
                            : 'button-unactive'
                    }
                    onClick={(e) => {
                        setTabActive(TAB_SHIPPING_UNIT_TYPE)
                        setParams(defaultParams)
                    }}
                >
                    Đơn vị vận chuyển
                </button>
            </div>
            <div className={
                tabActive === TAB_STORE_TYPE
                    ? 'verify-list-content__tab'
                    : 'verify-list-content__tab-unactive'
            }>

                <div className="verify-list-content__action">
                    <div className="verify-list-content__action__select">
                        <span className='verify-list-content__action__span'>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
                            onChange={(e) =>
                                setParams({ ...params, limit: e.target.value })
                            }
                        >
                            {numOfItem.map((numOfItem, index) => {
                                return (
                                    <option key={index} value={numOfItem}>
                                        {numOfItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <Dropdown overlay={menu} trigger="click" placement="bottom">
                        <div
                            className={
                                params.is_deleted !== null
                                    ? 'verify-list-content__action__filter-active'
                                    : 'verify-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="verify-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Chủ cửa hàng, email, số điện thoại, địa chỉ"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="verify-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="verify-list-content__sub">
                    <Table
                        className="verify-list-content__sub__table"
                        columns={columnsStore}
                        dataSource={storeList}
                        pagination={state.pagination}
                        scroll={{
                            y: '50vh',
                        }}
                    ></Table>
                </div>
                <Modal
                    className="verify-modal"
                    title="Xác thực cửa hàng"
                    visible={showVerifyStoreModal}
                    onOk={handleVerifyStore}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắn chắn muốn xác thực cửa hàng này?</p>
                </Modal>
            </div>

            <div className={
                tabActive === TAB_SHIPPING_UNIT_TYPE
                    ? 'verify-list-content__tab'
                    : 'verify-list-content__tab-unactive'
            }>

                <div className="verify-list-content__action">
                    <div className="verify-list-content__action__select">
                        <span className='verify-list-content__action__span'>Hiển thị </span>
                        <select
                            defaultValue={{ value: params.pageSize }}
                            onChange={(e) =>
                                setParams({ ...params, limit: e.target.value })
                            }
                        >
                            {numOfItem.map((numOfItem, index) => {
                                return (
                                    <option key={index} value={numOfItem}>
                                        {numOfItem}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <Dropdown overlay={menu} trigger="click" placement="bottom">
                        <div
                            className={
                                params.is_deleted !== null
                                    ? 'verify-list-content__action__filter-active'
                                    : 'verify-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="verify-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Chủ đơn vị vận chuyển, email, số điện thoại, địa chỉ"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="verify-list-content__action__search__icon" />
                    </div>
                </div>

                <div className="verify-list-content__sub">
                    <Table
                        className="verify-list-content__sub__table"
                        columns={columnsShippingUnit}
                        dataSource={shippingUnitList}
                        pagination={state.pagination}
                        scroll={{
                            y: '50vh',
                        }}
                    ></Table>
                </div>
                <Modal
                    className="delete-verify-modal"
                    title="Xác thực đơn vị vận chuyển này"
                    visible={showVerifyShippingUnitModal}
                    onOk={handleVerifyShippingUnit}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắn chắn muốn xác thực cho đơn vị vận chuyển này?</p>
                </Modal>
            </div>
        </div>
    )
}

export default VerifyList
