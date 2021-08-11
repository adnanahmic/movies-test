import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewDashboardIcon from "mdi-react/ViewDashboardIcon";
import FormatListBulletedIcon from "mdi-react/FormatListBulletedIcon";
import SearchIcon from "mdi-react/SearchIcon";
import CloseIcon from "mdi-react/CloseIcon";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, searchMovies } from "../../store/actions";
import CreateMovie from '../CreateMovie'

const Header = (props) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (showSearch) {
      dispatch(setSearch(true));
    } else dispatch(setSearch(false));
  }, [showSearch, dispatch]);

  useEffect(() => {
    if (!search) {
      setSearchText("");
      setShowSearch(false);
    }
  }, [search]);

  useEffect(() => {
    searchText &&
      searchText.length % 2 === 0 &&
      dispatch(searchMovies({ searchText, page: 0 }));
  }, [searchText, dispatch]);

  return (
    <header>
      <Link className="logo" to="/">
        <img src="/logo192.png" alt="Logo" />
        <p>Movies DB</p>
      </Link>
      <nav type="main">
        <Link to="/">
          <ViewDashboardIcon className="icon" size={36} />
          <span>Movies</span>
        </Link>
        <Link to="/list">
          <FormatListBulletedIcon className="icon" size={36} />
          <span>TV Shows</span>
        </Link>
      </nav>
      <nav type="sub">
        {showSearch ? (
          <>
            <input
              className="search-input"
              type="text"
              placeholder="Search movies"
              onChange={(event) => setSearchText(event.target.value)}
              value={searchText}
            />
            <CloseIcon
              className="icon"
              size={36}
              onClick={() => setShowSearch(false)}
            />
          </>
        ) : (
            <SearchIcon
              size={48}
              onClick={() => setShowSearch(true)}
              className="icon-search"
            />
          )}
      </nav>
      <nav type="actions">
        <button onClick={openModal}>Add Movie / Show</button>
      </nav>
      <CreateMovie 
        onClose={closeModal}
        isOpen={modalIsOpen}
      />
    </header>
  );
};

export default Header;
