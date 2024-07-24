import { FETCH_BLOCKSUB_ERROR, FETCH_BLOCKSUB_LOADING, FETCH_BLOCKSUB_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const blocksubreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_BLOCKSUB_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_BLOCKSUB_SUCESS:
      return {
        ...state,
        data: action.payload
      };

    case FETCH_BLOCKSUB_ERROR:
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
