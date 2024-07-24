import { LOGIN_ERROR, LOGIN_LOADNG, LOGIN_SUCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: JSON.parse(localStorage.getItem('userinfo')) || {},
  error: null
};
export const loginreducer = (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN_LOADNG:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOGIN_SUCESS:
      return {
        ...state,
        data: action.payload
      };

    case LOGIN_ERROR:
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
