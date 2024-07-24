import { FECTCH_DASHDATA_ERROR, FECTCH_DASHDATA_LOADING, FECTCH_DASHDATA_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const dashreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_DASHDATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_DASHDATA_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_DASHDATA_ERROR:
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
