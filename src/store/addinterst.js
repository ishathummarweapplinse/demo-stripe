import { FECTCH_ADDINTERESTS_ERROR, FECTCH_ADDINTERESTS_LOADING, FECTCH_ADDINTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const addintersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_ADDINTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_ADDINTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_ADDINTERESTS_ERROR:
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
