import { FECTCH_ADDSUBINTERESTS_ERROR, FECTCH_ADDSUBINTERESTS_LOADING, FECTCH_ADDSUBINTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const addsubintersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_ADDSUBINTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_ADDSUBINTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_ADDSUBINTERESTS_ERROR:
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
