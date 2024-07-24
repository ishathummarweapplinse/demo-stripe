import { CHATADD_ERROR, CHATADD_LOADING, CHATADD_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: null,
  error: null
};
export const chataddreducer = (state = initialstate, action) => {
  switch (action.type) {
    case CHATADD_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CHATADD_SUCCESS:
      console.log(action.payload, 'payload');
      return {
        ...state,
        data: action.payload
      };

    case CHATADD_ERROR:
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
