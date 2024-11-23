import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal,DatePicker } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    FileZipOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import useAuth from 'hooks/useAuth'
import './order-list.scss'
import '../../../../index.scss'
import orderApi from 'api/orderApi'
import shipperApi from 'api/shipperApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

function OrderList() {
    const { user } = useAuth()
    const [orderList, setOrderList] = useState([])
    const [total, setTotal] = useState(0)
    const [showAssignShipperModal, setShowAssignShipperModal] = useState(false)
    const [statusOrder, setStatusOrder] = useState() 
    const [shipperList, setShipperList] = useState([])
    const [recordUpdate, setRecordUpdate] = useState({})

    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        store_id: null,
        category_id: null,
        order_date_start: null,
        order_date_end: null,
        shipper_id: user.id
    }
    const [params, setParams] = useState(defaultParams)

    const handleSubmit = async () => {
        try {
            const updateOrder = {
                status_id: parseInt(statusOrder.status_id)
            }
            const response = await orderApi.updateOrderByShipper(statusOrder.id, updateOrder)
            alert(response.data.message)
            setShowAssignShipperModal(false)
        } catch (error) {
            alert(error.response.data.message)
            setShowAssignShipperModal(false)
        }
    }

    const handleCancel = () => {
        setShowAssignShipperModal(false)
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
            orderApi.getAllByShipper(params).then((response) => {
                setTotal(response.data.total)
                setOrderList(response.data.data.map((order) => ({
                    id: order.id,
                    avatar: order.avatar,
                    user_name: order.user_name,
                    transport_name: order.transport_name,
                    receiver_name: order.receiver_name,
                    order_date: order.order_date,
                    price: order.price,
                    status: order.status,
                    shipper_id: order.shipper_id
                })))
            })
        }
    }, [params])

    const aListStatus = [
        {
            key: 4,
            value: "Shipper nhận hàng",
        },
        {
            key: 5,
            value: "Đang giao hàng",
        },
        {
            key: 6,
            value: "Đã giao thành công",
        },
        {
            key: 7,
            value: "Giao hàng thất bại",
        },
        {
            key: 8,
            value: "Pending"
        }
    ]


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: '8%',
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt="image"
                    />
                )
            },
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'user_name',
            width: '10%',
        },
        {
            title: 'Đơn vị giao hàng',
            dataIndex: 'transport_name',
            width: '10%',
        },
        {
            title: 'Người nhận hàng',
            dataIndex: 'receiver_name',
            width: '10%',
        },
        {
            title: 'Thời gian order',
            dataIndex: 'order_date',
            width: '10%',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            width: '8%',
        },
      
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '8%',
            render: (text, record) => (
                <div className="order-shipper-list-menu__item__row">
                <select
                     onChange={(e) => {
                        debugger
                        const value = e.target.value;
                        setStatusOrder({
                            ...record,
                            status_id : value
                        })
                    }}
                >
                  <option key="all" value={record.status}>
                    {record.status}
                  </option>
                  {aListStatus?.map((oItem) => (
                    <option key={oItem.key} value={oItem.key}>
                      {oItem.value}
                    </option>
                  ))}
                </select>
              </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <FileZipOutlined className="icon-edit"
                        onClick={() => {
                            setShowAssignShipperModal(true)
                            // setStatusOrder(record)
                        }}
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="order-shipper-list-menu">
                <div className="order-shipper-list-menu__item">

                    <div className="border-bottom">
                        Thời gian order
                     </div>
                    <div className="order-shipper-list-menu__item__row">
                        <span className="order-shipper-list-menu__item__row__span">
                            Từ ngày
                        </span>
                        <DatePicker
                            size="medium"
                            className="input-datePicker"
                            onChange={(date, dateString) =>
                                setParams({
                                    ...params,
                                    order_date_start: dateString,
                                })
                            }
                        />
                    </div>
                    <div className="order-shipper-list-menu__item__row">
                        <span className="order-shipper-list-menu__item__row__span">
                            Đến ngày
                        </span>
                        <DatePicker
                            size="medium"
                            className="input-datePicker"
                            onChange={(date, dateString) =>
                                setParams({
                                    ...params,
                                    order_date_end: dateString,
                                })
                            }
                        />
                    </div>
                </div>
            </Menu>
        )
    }


    return (
        <div>
            <div className="title">Danh sách order</div>
            <div className="order-shipper-list-content__action">
                <div className="order-shipper-list-content__action__select">
                    <span className='order-shipper-list-content__action__span'>Hiển thị </span>
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
                            params.order_date_start !== null && params.order_date_end !==null
                                ? 'order-shipper-list-content__action__filter-active'
                                : 'order-shipper-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="order-shipper-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tên khách hàng, người nhận"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                txt_search: e.target.value,
                            })
                        }
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="order-shipper-list-content__action__search__icon" />
                </div>
            </div>

            <div className="order-shipper-list-content__sub">
                <Table
                    className="order-shipper-list-content__sub__table"
                    columns={columns}
                    dataSource={orderList}
                    pagination={state.pagination}

                ></Table>
            </div>
            <Modal
                className="delete-account-modal"
                title="Thay đổi trạng thái đơn hàng"
                visible={showAssignShipperModal}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng không?</p>
            </Modal>
        </div>
    )
}

export default OrderList
