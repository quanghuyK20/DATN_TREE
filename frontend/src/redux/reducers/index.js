import { combineReducers } from 'redux';
import {carts, cartsSend, cartPayment,addProductToCart} from './carts';
import {products, productsByParams, productsByStoreId} from './products';
import {stores,storeInfoById} from './stores';
import {vouchersByStoreId, saveVoucherByUser} from './vouchers';
import feedbacksByProductId from './feedbacks';
import newOrder from './order';

const rootReducer = combineReducers({
  products: products,
  carts: carts,
  stores: stores,
  storeInfoById: storeInfoById,
  productsByStoreId: productsByStoreId,
  vouchersByStoreId: vouchersByStoreId,
  feedbacksByProductId: feedbacksByProductId,
  cartsSend: cartsSend,
  productsByParams: productsByParams,
  cartPayment: cartPayment,
  saveVoucherByUser: saveVoucherByUser,
  newOrder: newOrder,
  addProductToCart: addProductToCart,
});

export default rootReducer;