import * as type from '../types.js';

const initStateFeedbacksByProductId = {
    feedbacksByProductId: {
      isLoading: true,
      data: [],
      err: null,
    },
}

function feedbacksByProductId(state = initStateFeedbacksByProductId, action) {
    switch (action.type) {
      case type.GET_FEEDBACK_BY_PRODUCT_ID_SUCCESS:
        return {
          ...state,
          feedbacksByProductId:{
            isLoading: false,
            data:action.feedbacks,
          }
        }
      case type.GET_FEEDBACK_BY_PRODUCT_ID_REQUEST:
        return {
          ...state,
          feedbacksByProductId:{
            isLoading: true,
            data:[],
          }
        }
      case type.GET_FEEDBACK_BY_PRODUCT_ID_FAILED:
        return {
          ...state,
          feedbacksByProductId:{
            isLoading: false,
            data: [],
            err: action.message
          }
        }
      default:
        return state
    } 
}

export default feedbacksByProductId