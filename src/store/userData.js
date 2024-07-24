import { USER_DATA_ERROR, USER_DATA_LOADING, USER_DATA_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const userdata = (state = initialstate, action) => {
  switch (action.type) {
    case USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case USER_DATA_SUCESS:
      return {
        ...state,
        // data: state.data.filter((record) => record.id !== action.payload)
        data: action.payload,
        loading: false
      };

    case USER_DATA_ERROR:
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
