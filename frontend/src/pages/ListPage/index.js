import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getMoviesList } from "../../store/actions";
import { getYearFromDateString } from "../../utils";
import "./list.scss";

const { REACT_APP_API_URL } = process.env;

const ListPage = () => {
  const dispatch = useDispatch()
  const { movies, loading, search } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMoviesList('show', 1))
  }, [dispatch])

  useEffect(() => {
    !search && dispatch(getMoviesList('show', 1));
  }, [search, dispatch])

  return (
    <div className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Show Name</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td type="image-title">
                <img
                  src={`${REACT_APP_API_URL}${movie.cover.replace('public', '')}`}
                  alt="Movie"
                />
                <div>
                  <h4>{movie.title}</h4>
                  <p>{movie.description}</p>
                </div>
              </td>
              <td>{getYearFromDateString(movie.release)}</td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
