import { FECTCH_SUBINTERESTS_ERROR, FECTCH_SUBINTERESTS_LOADING, FECTCH_SUBINTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const subintersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_SUBINTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_SUBINTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_SUBINTERESTS_ERROR:
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
