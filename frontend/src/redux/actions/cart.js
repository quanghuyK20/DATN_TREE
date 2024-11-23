import * as type from '../types';

export function getProductsCartByUser() {
  return { 
    type: type.GET_PRODUCTS_CART_BY_USER_REQUEST,
    payload: null,
  }
}

export function getProductsSelected(products) {
  return { 
    type: type.GET_PRODUCTS_CART_SELECTED_SEND,
    payload: products,
  }
}

export function getCartPayment(cart) {
  return { 
    type: type.GET_CART_PAYMENT,
    payload: cart,
  }
}

export function addProductToCart(products){
  return {
    type: type.ADD_PRODUCTS_TO_CART_REQUEST,
    payload: products
  }
}
