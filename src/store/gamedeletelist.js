import { GAMELISTDELETE_ERROR, GAMELISTDELETE_LOADING, GAMELISTDELETE_SUCCESS } from '../services/constant';

const initialstate = {
  loading: false,
  data: [],
  error: null
};
export const gamedeletelistreducer = (state = initialstate, action) => {
  switch (action.type) {
    case GAMELISTDELETE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GAMELISTDELETE_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case GAMELISTDELETE_ERROR:
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
