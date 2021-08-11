import {
  SET_SEARCH,
  GET_MOVIES,
  SEARCH_MOVIES,
  SET_MOVIES,
} from "../actions/constants";

const initialState = {
  movies: [],
  loading: false,
  search: false,
  total: 0,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return { ...state, loading: true };
    case SEARCH_MOVIES:
      return {
        ...state,
        loading: true,
        search: true,
        movies: payload.page > 1 ? state.movies : [],
      };
    case SET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: payload.page === 0 ? payload.data.data : [...state.movies, ...payload.data.data],
        total: payload.total,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: payload,
        movies: state.search && !payload ? [] : state.movies,
      };
    default:
      return state;
  }
};

export default rootReducer;
