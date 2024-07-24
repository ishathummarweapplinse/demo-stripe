import { DELETE_CLUE_ERROR, DELETE_CLUE_LOADING, DELETE_CLUE_SUCCESS } from '../services/constant';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const cluedelteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CLUE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CLUE_SUCCESS:
      return {
        ...state,

        data: action.payload
      };
    case DELETE_CLUE_ERROR:
      return {
        ...state,

        error: action.payload
      };
    default:
      return state;
  }
};

export default cluedelteReducer;
