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
import './user-list.scss'
import '../../../../index.scss'

const { Search } = Input
const numOfItem = [10, 15, 25]

function UserList() {
    const { user } = useAuth()
    const [userList, setUserList] = useState([])
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
        if (!!user) {
            userApi.getUsers(params).then((response) => {
                console.log("params",params);
                setTotal(response.data.total)
                setUserList(response.data.data.map((user)=>({
                    id: user.id,
                    avatar: user.avatar,
                    name: user.name,
                    email: user.email,
                    phone_number: user.phone_number,
                    role: user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'Customer' : user.role_id === 3 ? 'Seller' : 'Shipper',
                    address: user.address,
                    deleted_at: user.deleted_at ? 'Đã xóa' : 'Chưa xóa',
                })))
            })
        }
    }, [params])


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '6%',
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
            width: '13%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '14%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            width: '8%',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            width: '10%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '27%',
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
                    <Link to={`/admin/accounts/edit/${record.id}`}>
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
            <Menu className="account-list-menu">
                <div className="account-list-menu__item">
                    <div className="account-list-menu__item__row">
                        <span className="account-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="account-list-menu__item__row__select"
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
            <div className="title">Danh sách tài khoản</div>
                <div className="account-list-content__action">
                    <div className="account-list-content__action__select">
                        <span className='account-list-content__action__span'>Hiển thị </span>
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
                                    ? 'account-list-content__action__filter-active'
                                    : 'account-list-content__action__filter-unactive'
                            }
                        >
                            <FilterOutlined />
                        </div>
                    </Dropdown>

                    <div className="account-list-content__action__search">
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
                        <SearchOutlined className="account-list-content__action__search__icon" />
                    </div>
                    <Link
                        className="account-list-content__action__add"
                        to="/admin/accounts/add"
                    >
                        <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                        <span>User</span>
                    </Link>
                </div>

                <div className="account-list-content__sub">
                    <Table
                        className="account-list-content__sub__table"
                        columns={columns}
                        dataSource={userList}
                        pagination={state.pagination}
                        scroll={{
                            y: '50vh',
                        }}
                    ></Table>
                </div>
            <Modal
                className="delete-account-modal"
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

export default UserList
