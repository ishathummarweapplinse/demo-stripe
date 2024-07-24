import { FETCH_BLOCK_ERROR, FETCH_BLOCK_LOADING, FETCH_BLOCK_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const blockreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_BLOCK_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_BLOCK_SUCESS:
      return {
        ...state,
        data: action.payload
      };

    case FETCH_BLOCK_ERROR:
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
