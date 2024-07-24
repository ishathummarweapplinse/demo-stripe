import { CHATDELETE_ERROR, CHATDELETE_LOADING, CHATDELETE_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const deletchatreducer = (state = initialstate, action) => {
  switch (action.type) {
    case CHATDELETE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CHATDELETE_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case CHATDELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
