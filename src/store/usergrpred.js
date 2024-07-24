import { USER_GRPLIST_ERROR, USER_GRPLIST_LOADING, USER_GRPLIST_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const usergrplistdata = (state = initialstate, action) => {
  switch (action.type) {
    case USER_GRPLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case USER_GRPLIST_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case USER_GRPLIST_ERROR:
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
