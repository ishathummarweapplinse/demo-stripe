import { ADD_CLUE_LOADING, ADD_CLUE_SUCCESS, ADD_CLUE_ERROR } from '../services/constant';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const clueaddReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLUE_LOADING:
      return { ...state, loading: true };
    case ADD_CLUE_SUCCESS:
      return { ...state, data: action.payload };
    case ADD_CLUE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default clueaddReducer;
