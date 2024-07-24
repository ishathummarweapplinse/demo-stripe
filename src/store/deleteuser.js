import { FETCHDELETE_USER_ERROR, FETCHDELETE_USER_LOADING, FETCHDELETE_USER_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const deleteuserreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCHDELETE_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHDELETE_USER_SUCESS:
      return {
        ...state,
        data: action.payload
      };

    case FETCHDELETE_USER_ERROR:
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
