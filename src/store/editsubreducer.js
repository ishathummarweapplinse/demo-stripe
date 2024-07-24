import { FECTCH_EDITSUBINTERESTS_ERROR, FECTCH_EDITSUBINTERESTS_LOADING, FECTCH_EDITSUBINTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const editsubintersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_EDITSUBINTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_EDITSUBINTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_EDITSUBINTERESTS_ERROR:
      console.log(...state);
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
