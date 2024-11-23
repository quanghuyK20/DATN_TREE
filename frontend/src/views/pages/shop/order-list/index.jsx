import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Input, Menu, Dropdown, Space, Modal,DatePicker } from 'antd'
import {
    FilterOutlined,
    SearchOutlined,
    FileZipOutlined
} from '@ant-design/icons'
import productApi from 'api/productApi'
import useAuth from 'hooks/useAuth'
import './order-list.scss'
import '../../../../index.scss'
import storeApi from 'api/storeApi'
import productCategoryApi from 'api/productCategoryApi'
import orderApi from 'api/orderApi'

const { Search } = Input
const numOfItem = [10, 15, 25]

function OrderList() {
    const { user } = useAuth()
    const [orderList, setOrderList] = useState([])
    const [total, setTotal] = useState(0)
    const [deleteProduct, setDeleteProduct] = useState()
    const [storeList, setStoreList] = useState([])
    const [statusOrder, setStatusOrder] = useState({})
    const [showChangeStatusModal, setShowChangeStatusModel] = useState(false)

    const defaultParams = {
        limit: 10,
        page: 1,
        txt_search: null,
        is_deleted: null,
        // store_id: user.store_id,
        category_id: null
    }
    const [params, setParams] = useState(defaultParams)

    const handleSubmit = async () => {
        try {
            const updateOrder = {
                status_id: parseInt(statusOrder.status_id)
            }
            const response = await orderApi.updateOrderByShop(statusOrder.id, updateOrder)
            alert(response.data.message)
            setShowChangeStatusModel(false)
        } catch (error) {
            alert(error.response.data.message)
            setShowChangeStatusModel(false)
        }
    }

    const handleCancel = () => {
        setShowChangeStatusModel(false)
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
            orderApi.getAllByShop(params).then((response) => {
                console.log(params);
                setTotal(response.data.total)
                setOrderList(response.data.data.map((order) => ({
                    id: order.id,
                    avatar: order.avatar,
                    user_name: order.user_name,
                    product_name: order.product_name,
                    transport_name: order.transport_name,
                    receiver_name: order.receiver_name,
                    order_date: order.order_date,
                    price: order.price,
                    status: order.status,
                })))
            })
        }
    }, [params])

    useEffect(() => {
        storeApi.getStores().then((response) => {
            setStoreList(response.data[0])
        })
    }, [params])

    const aListStatus = [
        {
            key: 2,
            value: "Đang chuẩn bị hàng",
        },
        {
            key: 3,
            value: "Xuất kho",
        }
    ]

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'user_avatar',
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
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
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
            width: '10%',
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
                            setShowChangeStatusModel(true)
                            // setStatusOrder(record)
                        }}
                    />
                </Space>
            ),
        }
    ]

    const menu = () => {
        return (
            <Menu className="order-shop-list-menu">
                <div className="order-shop-list-menu__item">

                    <div className="order-shop-list-menu__item__row">
                        <span className="order-shop-list-menu__item__row__span">
                            Đơn vị vận chuyển
                        </span>
                        <select
                            className="order-shop-list-menu__item__row__select"
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
                                Chưa bán
                            </option>
                            <option key={2} value={1}>
                                Đã bán
                            </option>
                        </select>
                    </div>

                    <div className="order-shop-list-menu__item__row">
                        <span className="order-shop-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="order-shop-list-menu__item__row__select"
                            onChange={(e) => {
                                e.target.value === 'All'
                                    ? setParams({ ...params, store_id: null })
                                    : setParams({
                                        ...params,
                                        store_id: e.target.value,
                                    });
                            }}
                        >
                            <option value="All">All</option>
                            {storeList?.map((store, index) => (
                                <option key={index} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="border-bottom">
                        Thời gian order
                     </div>
                    <div className="order-shop-list-menu__item__row">
                        <span className="order-shop-list-menu__item__row__span">
                            Từ ngày
                        </span>
                        <DatePicker
                            size="medium"
                            className="input-datePicker"
                            onChange={(date, dateString) =>
                                setParams({
                                    ...params,
                                    from_date: dateString,
                                })
                            }
                        />
                    </div>
                    <div className="order-shop-list-menu__item__row">
                        <span className="order-shop-list-menu__item__row__span">
                            Đến ngày
                        </span>
                        <DatePicker
                            size="medium"
                            className="input-datePicker"
                            onChange={(date, dateString) =>
                                setParams({
                                    ...params,
                                    to_date: dateString,
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
        <div className="order-shop-list-content__action">
          <div className="order-shop-list-content__action__select">
            <span className="product-list-content__action__span">
              Hiển thị{" "}
            </span>
            <select
              defaultValue={{ value: params.pageSize }}
              onChange={(e) => setParams({ ...params, limit: e.target.value })}
            >
              {numOfItem.map((numOfItem, index) => {
                return (
                  <option key={index} value={numOfItem}>
                    {numOfItem}
                  </option>
                );
              })}
            </select>
          </div>
          <Dropdown overlay={menu} trigger="click" placement="bottom">
            <div
              className={
                params.is_deleted !== null || params.category_id !== null
                  ? "product-list-content__action__filter-active"
                  : "product-list-content__action__filter-unactive"
              }
            >
              <FilterOutlined />
            </div>
          </Dropdown>

          <div className="order-shop-list-content__action__search">
            <Search
              className="search-box"
              placeholder="Tên khách hàng, giá thành, mô tả"
              onChange={(e) =>
                setParams({
                  ...params,
                  txt_search: e.target.value,
                })
              }
              allowClear
              suffix
            />
            <SearchOutlined className="order-shop-list-content__action__search__icon" />
          </div>
        </div>

        <div className="order-shop-list-content__sub">
          <Table
            className="order-shop-list-content__sub__table"
            columns={columns}
            dataSource={orderList}
            pagination={state.pagination}
            scroll={{
              y: "50vh",
            }}
          ></Table>
        </div>
        <Modal
          className="delete-account-modal"
          title="Thay đổi trạng thái đơn hàng"
          visible={showChangeStatusModal}
          closable={() => {
            setShowChangeStatusModel(false);
          }}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng không?</p>
        </Modal>
      </div>
    );
}

export default OrderList
