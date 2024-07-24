import { EDIT_CLUE_LOADING, EDIT_CLUE_SUCCESS, EDIT_CLUE_ERROR } from '../services/constant';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const clueeditReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CLUE_LOADING:
      return { ...state, loading: true };
    case EDIT_CLUE_SUCCESS:
      return { ...state, data: action.payload };
    case EDIT_CLUE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default clueeditReducer;
