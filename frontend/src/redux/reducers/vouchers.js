import * as type from '../types.js';

const initStateVoucherByStoreId = {
    vouchersByStoreId: {
      isLoading: true,
      data: [],
      err: null,
    },
    saveVoucherByUser:{
      data: [],
      isSucces: false,
      err: null
    }
}

function vouchersByStoreId(state = initStateVoucherByStoreId, action) {
    switch (action.type) {
      case type.GET_VOUCHER_BY_STORE_ID_SUCCESS:
        return {
          ...state,
          vouchersByStoreId:{
            isLoading: false,
            data:action.voucher,
          }
        }
      case type.GET_VOUCHER_BY_STORE_ID_REQUEST:
        return {
          ...state,
          vouchersByStoreId:{
            isLoading: true,
            data:[],
          }
        }
      case type.GET_VOUCHER_BY_STORE_ID_FAILED:
        return {
          ...state,
          vouchersByStoreId:{
            isLoading: false,
            data: [],
            err: action.message
          }
        }
      default:
        return state
    } 
}

function saveVoucherByUser(state = initStateVoucherByStoreId, action) {
  switch (action.type) {
    case type.SAVE_VOUCHER_BY_USER_SUCCESS:
      return {
        ...state,
        saveVoucherByUser:{
          isSucces: true,
          data:action.voucher,
        }
      }
    case type.SAVE_VOUCHER_BY_USER_REQUEST:
      return {
        ...state,
        saveVoucherByUser:{
          isSucces: false,
          data:[],
        }
      }
    case type.SAVE_VOUCHER_BY_USER_FAILED:
      console.log("action voucher",action);
      return {
        ...state,
        saveVoucherByUser:{
          isLoading: false,
          data: [],
          err: action.message
        }
      }
    case type.RESET_FLAG_REQUEST:
      return {
        ...state,
        saveVoucherByUser:{
          isSucces: false,
          data:action.voucher,
        }
      }
    default:
      return state
  } 
}


export { vouchersByStoreId, saveVoucherByUser}