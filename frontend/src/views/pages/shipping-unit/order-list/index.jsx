import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal,DatePicker } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    FileZipOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import productApi from 'api/productApi'
import useAuth from 'hooks/useAuth'
import './order-list.scss'
import '../../../../index.scss'
import storeApi from 'api/storeApi'
import productCategoryApi from 'api/productCategoryApi'
import orderApi from 'api/orderApi'
import shipperApi from 'api/shipperApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

function OrderList() {
    const { user } = useAuth()
    const [orderList, setOrderList] = useState([])
    const [total, setTotal] = useState(0)
    const [showAssignShipperModal, setShowAssignShipperModal] = useState(false)
    const [shipperAssign, setShipperAssign] = useState()
    const [shipperList, setShipperList] = useState([])

    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        store_id: null,
        category_id: null,
        order_date_start: null,
        order_date_end: null,
        shipping_unit_id: user.id
    }
    const [params, setParams] = useState(defaultParams)

    const handleSubmit = async () => {
        try {
            console.log(shipperAssign);
            const updateOrder = {
                shipper_id: parseInt(shipperAssign.shipper_id_assign)
            }
            const response = await orderApi.updateOrderByShippingUnit(shipperAssign.id, updateOrder)
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
            orderApi.getAllByShippingUnit(params).then((response) => {
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

    useEffect(() => {
        shipperApi.getShipperByShippingUnit(user.id).then((response) => {
            setShipperList(response.data)
        })
    }, [])


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
                <span
                    className={
                        record.status === 'Đã bán'
                            ? 'span-red'
                            : 'span-green'
                    }
                >
                    {record.status}
                </span>
            ),
        },
        {
            title: 'Shipper',
            dataIndex: 'shipper_id',
            width: '28%',
            render: (text, record) => (
              <div className="product-list-menu__item__row">
                <select
                    onChange={(e) => {
                        const value = e.target.value;
                        setShipperAssign({
                            ...record,
                            shipper_id_assign : value
                        })
                        const isDeleted = value === 'All' ? null : value;
                    }}
                >
                  <option key="all" value={record.shipper_id}>
                    {record.shipper_id ? record.shipper_id : "Chưa có shipper"}
                  </option>
                  {shipperList?.map((oItem) => (
                    <option key={oItem.owner_id} value={oItem.owner_id}>
                      {oItem.user_name}
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
                            // setShipperAssign(record)
                        }}
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="product-list-menu">
                <div className="product-list-menu__item">

                    <div className="border-bottom">
                        Thời gian order
                     </div>
                    <div className="product-list-menu__item__row">
                        <span className="product-list-menu__item__row__span">
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
                    <div className="product-list-menu__item__row">
                        <span className="product-list-menu__item__row__span">
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
            <div className="product-list-content__action">
                <div className="product-list-content__action__select">
                    <span className='product-list-content__action__span'>Hiển thị </span>
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
                                ? 'product-list-content__action__filter-active'
                                : 'product-list-content__action__filter-unactive'
                        }
                    >
                        <FilterOutlined />
                    </div>
                </Dropdown>

                <div className="product-list-content__action__search">
                    <Search
                        className="search-box"
                        placeholder="Tên cây, giá thành, mô tả"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                txt_search: e.target.value,
                            })
                        }
                        allowClear
                        suffix
                    />
                    <SearchOutlined className="product-list-content__action__search__icon" />
                </div>
                <Link
                    className="product-list-content__action__add"
                    to="/admin/products/add"
                >
                    <PlusCircleOutlined className="feedback-list-content__action__add__icon" />
                    <span>Thêm sản phẩm</span>
                </Link>
            </div>

            <div className="product-list-content__sub">
                <Table
                    className="product-list-content__sub__table"
                    columns={columns}
                    dataSource={orderList}
                    pagination={state.pagination}

                ></Table>
            </div>
            <Modal
                className="delete-account-modal"
                title="Chọn shipper cho order"
                visible={showAssignShipperModal}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <p>Bạn có chắn chắn muốn chọn shipper này không ?</p>
            </Modal>
        </div>
    )
}

export default OrderList
