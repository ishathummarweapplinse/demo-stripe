import { TRASCATIONERROR, TRASCATION_LOADING, TRASCATION_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const trcreducer = (state = initialstate, action) => {
  switch (action.type) {
    case TRASCATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TRASCATION_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case TRASCATIONERROR:
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
