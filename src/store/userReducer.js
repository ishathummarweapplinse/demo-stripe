import { FETCH_USER_ERROR, FETCH_USER_LOADING, FETCH_USER_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const userred = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USER_SUCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    case FETCH_USER_ERROR:
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
