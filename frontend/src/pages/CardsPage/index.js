import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import MovieRating from "../../components/MovieRating"
import { getMoviesList } from "../../store/actions";
import { getYearFromDateString } from "../../utils";
import "./cards.scss";

const { REACT_APP_API_URL } = process.env;

const CardsPage = () => {
  const dispatch = useDispatch()
  const { movies, loading, search, total } = useSelector((state) => state);
  const [page, setPage] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedMovie(null)
  };

  useEffect(() => {
    dispatch(getMoviesList('movie', page));
  }, [dispatch, page]);

  useEffect(() => {
    !search && dispatch(getMoviesList('movie', page));
  }, [page, search, dispatch])

  return (
    <>
      <div className="movie-card-container">
        <MovieRating movieId={selectedMovie} isOpen={modalIsOpen} onClose={closeModal} />
        {movies.map((movie, index) => (
          <div
            className="movie-card"
            style={{
              backgroundImage: `url(${REACT_APP_API_URL}${movie.cover.replace('public', '')})`,
            }}
            key={movie._id}
          >
            <div className="overlay"></div>
            <div className="rating">{movie.rating} / 5</div>
            <div className="content">
              <div className="header">
                <h2 className="title">{movie.title}</h2>
                <h4 className="info">
                  ({getYearFromDateString(movie.release)}){" "}
                </h4>
              </div>
              <p className="desc">{movie.description}</p>
            </div>
            <button onClick={() => {
              setSelectedMovie(movie._id)
              openModal()
            }}>Provide Rating</button>
          </div>
        ))}
        {loading && <Loader />}
      </div>
      {movies.length < total && <button className="load-more" onClick={() => setPage(page + 1)}>Load More Data</button>}
    </>
  );
};

export default CardsPage;
