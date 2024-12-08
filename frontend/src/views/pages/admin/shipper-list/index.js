import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import userApi from 'api/userApi'
import useAuth from 'hooks/useAuth'             
import '../../../../index.scss'
import './shipper-list.scss'
import shipperApi from 'api/shipperApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

function ShipperList() {
    const { user } = useAuth()
    const [shipperList, setShipperList] = useState([])
    const [total, setTotal] = useState(0)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
    const [deleteUser, setDeleteUser] = useState()

    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        is_deleted: null,
    }
    const [params, setParams] = useState(defaultParams)

    const handleSubmit = async () => {
        try {
            const response = await userApi.softDeleteById(deleteUser.id)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleCancel = () => {
        setShowDeleteUserModal(false)
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
        shipperApi.getShipperByAdmin(params).then((response) => {
            console.log("params",params);
            setTotal(response.data.total)
            setShipperList(response.data.data.map((oItem)=>({
                id: oItem.id,
                avatar: oItem.avatar,
                name: oItem.user_name,
                email: oItem.email,
                phone_number: oItem.phone_number,
                address: oItem.address,
                deleted_at: oItem.deleted_at ? 'Đã xóa' : 'Chưa xóa',
            })))
        })
    }, [params])


    const columns = [
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
            width: '10%',
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
                    <Link to={`/admin/shippers/edit/${record.id}`}>
                        <EditOutlined className="icon-edit" />
                    </Link>
                    <DeleteOutlined
                        onClick={() => {
                            setShowDeleteUserModal(true)
                            setDeleteUser(record)
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="shipper-list-menu">
                <div className="shipper-list-menu__item">
                    <div className="shipper-list-menu__item__row">
                        <span className="shipper-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="shipper-list-menu__item__row__select"
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
            <div className="title">Danh sách shipper</div>
                <div className="shipper-list-content__action">
                    <div className="shipper-list-content__action__select">
                        <span className='shipper-list-content__action__span'>Hiển thị </span>
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
                                    ? 'shipper-list-content__action__filter-active'
                                    : 'shipper-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="shipper-list-content__action__search">
                        <Search
                            className="search-box"
                            placeholder="Chủ tài khoản, email, số điện thoại, địa chỉ"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    txt_search: e.target.value,
                                })
                            }
                            allowClear
                            suffix
                        />
                        <SearchOutlined className="shipper-list-content__action__search__icon" />
                    </div>
                    <Link
                        className="shipper-list-content__action__add"
                        to="/admin/shippers/add"
                    >
                        <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                        <span>Thêm Shipper</span>
                    </Link>
                </div>

                <div className="shipper-list-content__sub">
                    <Table
                        className="shipper-list-content__sub__table"
                        columns={columns}
                        dataSource={shipperList}
                        pagination={state.pagination}
                       
                    ></Table>
                </div>
            <Modal
                className="delete-shipper-modal"
                title="Xóa người dùng"
                visible={showDeleteUserModal}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <p>Bạn có chắn chắn muốn xóa người dùng hay không ?</p>
            </Modal>
        </div>
    )
}

export default ShipperList
