import { GAMELIST_ERROR, GAMELIST_LOADING, GAMELIST_SUCCESSPRIVATE, GAMELIST_SUCCESSPUBLIC } from '../services/constant';

const initialstate = {
  loading: false,
  datapublic: [],
  dataprivate: [],
  error: null
};
export const gamelistreducer = (state = initialstate, action) => {
  switch (action.type) {
    case GAMELIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GAMELIST_SUCCESSPRIVATE:
      return {
        ...state,
        dataprivate: action.payload,
        loading: false
      };
    case GAMELIST_SUCCESSPUBLIC:
      return {
        ...state,
        datapublic: action.payload,
        loading: false
      };
    case GAMELIST_ERROR:
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
