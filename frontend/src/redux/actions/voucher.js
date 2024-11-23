import * as type from '../types';

export function getVoucherByStoreId(storeId) {
    return {
      type: type.GET_VOUCHER_BY_STORE_ID_REQUEST,
      payload: storeId
    }
}

export function saveVoucherByUser(newVoucher) {
  return {
    type: type.SAVE_VOUCHER_BY_USER_REQUEST,
    payload: newVoucher
  }
}


export function resetFlag(){
  return {
    type: type.RESET_FLAG_REQUEST,
    payload: null
  }
}