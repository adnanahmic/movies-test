import { put, takeLatest, all, call } from "redux-saga/effects";
import { getMoviesList, setMoviesList } from "../actions";
import {
  createMoviesApi,
  getMoviesApi,
  loginApi,
  searchMoviesApi,
  rateMoviesApi
} from "../api";

function* fetchMovies(action) {
  const response = yield call(getMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList({ data: response.data, page: action.payload.page }));
}

function* searchMovies(action) {
  const response = yield call(searchMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList({ data: response.data, page: action.payload.page }));
}

function* createMovie(action) {
  yield call(createMoviesApi, action.payload.movieData)
  yield put(getMoviesList(action.payload.type, 0))
}

function* rateMovie(action) {
  yield call(rateMoviesApi, action.payload)
  yield put(getMoviesList(action.payload.type, 0))
}

function* login(action) {
  const resp = yield call(loginApi, action.payload)
  if (resp.status === 201) {
    const { accessToken } = resp.data
    localStorage.setItem('token', accessToken)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest("GET_MOVIES", fetchMovies),
    takeLatest("SEARCH_MOVIES", searchMovies),
    takeLatest("CREATE_MOVIE", createMovie),
    takeLatest("RATE_MOVIE", rateMovie),
    takeLatest("LOGIN", login),
  ]);
}
