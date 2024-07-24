import { BOOKINGDATA_ERROR, BOOKINGDATA_LOADING, BOOKINGDATA_SUCCESS,  } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const  booklistreducer = (state = initialstate, action) => {
  switch (action.type) {
    case BOOKINGDATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case BOOKINGDATA_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case BOOKINGDATA_ERROR:
      return {
        ...state,

        error: action.payload
      };

    default:
      return {
        ...state
      };
  }
};
