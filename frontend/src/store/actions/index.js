import {
  GET_MOVIES,
  SET_MOVIES,
  SEARCH_MOVIES,
  SET_SEARCH,
  CREATE_MOVIE,
  LOGIN,
  RATE_MOVIE,
} from "./constants";

export const getMoviesList = (type, page) => {
  return {
    type: GET_MOVIES,
    payload: { type, page },
  };
};

export const setMoviesList = (data) => {
  return {
    type: SET_MOVIES,
    payload: data,
  };
};

export const searchMovies = (data) => {
  return {
    type: SEARCH_MOVIES,
    payload: data,
  };
};

export const setSearch = (data) => {
  return {
    type: SET_SEARCH,
    payload: data,
  };
};

export const createMovie = data => {
  return {
    type: CREATE_MOVIE,
    payload: data
  }
}

export const rateMovie = data => {
  return {
    type: RATE_MOVIE,
    payload: data
  }
}

export const login = data => {
  return {
    type: LOGIN,
    payload: data
  }
}
