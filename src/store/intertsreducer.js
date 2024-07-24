import { FECTCH_INTERESTS_ERROR, FECTCH_INTERESTS_LOADING, FECTCH_INTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const intersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_INTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_INTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_INTERESTS_ERROR:
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
