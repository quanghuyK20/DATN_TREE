import * as type from '../types.js';

const initialNewOrderState = {
    newOrder:{
      data: [],
      isSucces: false,
      err: null
    }
}
 
function newOrder(state = initialNewOrderState, action) {
  switch (action.type) {
    case type.POST_ORDER_SUCCESS:
      return {
        ...state,
        newOrder:{
          isSucces: true,
          data:action.productOrderList,
        }
      }
    case type.POST_ORDER_REQUEST:
      return {
        ...state,
        newOrder:{
          isSucces: false,
          data:[],
        }
      }
    case type.POST_ORDER_FAILED:
      return {
        ...state,
        newOrder:{
          isSucces: false,
          data: [],
          err: action.message
        }
      }
    default:
      return state
  } 
}


export default newOrder;