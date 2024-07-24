

import { FETCH_DATA_LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../services/constant';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const clueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return { ...state, loading: true, error: null };
    case FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_DATA_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default clueReducer;
