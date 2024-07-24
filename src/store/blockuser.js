import { FETCHUSER_BLOCK_ERROR, FETCHUSER_BLOCK_LOADING, FETCHUSER_BLOCK_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const blockuserreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCHUSER_BLOCK_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHUSER_BLOCK_SUCESS:
      return {
        ...state,
        data: action.payload
      };

    case FETCHUSER_BLOCK_ERROR:
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
