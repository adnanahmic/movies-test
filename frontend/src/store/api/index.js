import Axios from "axios";

const { REACT_APP_API_URL } = process.env;

const axiosInstance = Axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  if (token)
    config.headers.Authorization = `Bearer ${token}`
  return config;
});

export const getMoviesApi = ({ type, page }) => {
  return axiosInstance.get(
    `${REACT_APP_API_URL}/movies?type=${type}&$skip=${page * 10}&$sort[rating]=-1`
  );
};

export const searchMoviesApi = ({ searchText }) => {
  return axiosInstance.get(
    `${REACT_APP_API_URL}/$search=${searchText}`
  );
};

export const createMoviesApi = (data) => {
  return axiosInstance.post(
    `${REACT_APP_API_URL}/movies`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  );
};

export const rateMoviesApi = (data) => {
  return axiosInstance.post(
    `${REACT_APP_API_URL}/ratings`, data
  );
};

export const loginApi = (data) => {
  return axiosInstance.post(
    `${REACT_APP_API_URL}/authentication`, data
  );
};