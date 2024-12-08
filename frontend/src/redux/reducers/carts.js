import * as type from '../types.js';

const initStateCart = {
    carts: {
      isLoading: true,
      data: [],
      err: null,
      isSuccess : false,
      isFailed : false
    },
    cartPayment: []
}

function carts(state = initStateCart, action) {
    switch (action.type) {
        case type.GET_PRODUCTS_CART_BY_USER_SUCCESS:
        return {
          ...state,
          carts: {
            data: action.products,
            isLoading: false,
          }
        }
      case type.GET_PRODUCTS_CART_BY_USER_REQUEST:
        return {
          ...state,
          carts: {
            data: [],
            isLoading: true,
          }
        }
      case type.GET_PRODUCTS_CART_BY_USER_FAILED:
        return {
          ...state,
          carts: {
            data: [],
            isLoading: false,
            err: action.message,
          }
        }
      default:
        return state
    }
}

function cartsSend(state = initStateCart, action) {
  switch (action.type) {
      case type.GET_PRODUCTS_CART_SELECTED_SEND:
      return {
        ...state,
        carts: {
          data: action.products,
          isLoading: false,
        }
      }
    default:
      return state
  }
}

function cartPayment(state = initStateCart, action) {
  switch (action.type) {
      case type.GET_CART_PAYMENT:
      return {
        ...state,
        cartPayment: action.payload
      }
    default:
      return state
  }
}

function addProductToCart(state = initStateCart, action){
  switch (action.type) {
    case type.ADD_PRODUCTS_TO_CART_SUCCESS:
    return {
      ...state,
      carts: {
        data: action.products,
        isLoading: false,
        isSuccess: true
      }
    }
  case type.ADD_PRODUCTS_TO_CART_REQUEST:
    return {
      ...state,
      carts: {
        data: [],
        isLoading: true,
      }
    }
  case type.ADD_PRODUCTS_TO_CART_FAILED:
    return {
      ...state,
      carts: {
        data: [],
        isLoading: false,
        err: action.message,
        isFailed: true,
      }
    }
  default:
    return state
}
}

export {
  carts,
  cartsSend,
  cartPayment,
  addProductToCart
} 