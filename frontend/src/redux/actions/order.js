import * as type from '../types'

export function createOrder(newOrder){
    return {
        type: type.POST_ORDER_REQUEST,
        payload: newOrder
    }
}