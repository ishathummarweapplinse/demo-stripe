import { FECTCH_EDITINTERESTS_ERROR, FECTCH_EDITINTERESTS_LOADING, FECTCH_EDITINTERESTS_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const editintersetreducer = (state = initialstate, action) => {
  switch (action.type) {
    case FECTCH_EDITINTERESTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FECTCH_EDITINTERESTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case FECTCH_EDITINTERESTS_ERROR:
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
