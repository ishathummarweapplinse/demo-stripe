import { ADMIN_CONNECTION_LIST_ERROR, ADMIN_CONNECTION_LIST_LOADING, ADMIN_CONNECTION_LIST_SUCCESS } from '../services/constant';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const adminConnectionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CONNECTION_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADMIN_CONNECTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ADMIN_CONNECTION_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default adminConnectionListReducer;
